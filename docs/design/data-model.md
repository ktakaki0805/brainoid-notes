# データモデル

すべてはページで、ページ同士の関係はリンクです。クラスもプロパティもページとして同じグラフに載ります。

この文書の前半（概念と規則）は決定済みです。後半（Yjsの構造とPostgresの表）は案で、M1の検証（T-010〜T-014）とT-020、T-023で確定します。

## 概念

### ページとリンク

- ページは本文とプロパティからなる。
- リンクは内部ではページIDを持ち、画面にはタイトルを表示する。
- タイトルはワークスペース内で一意。同名の概念は `核 (線形代数)` と `核 (生物学)` のように括弧で区別する。
- リンクの表示名は変えられる。本文に「核」と表示して `核 (線形代数)` を指せる。
- まだないページへのリンクも書ける。クリックするとその名前でページができる。
- 型のないページが主役で、型は事実を引くための骨組み。

### クラス

- クラスもページ。ページは `type` でクラスを指し、複数のクラスを持てる。
- クラスは `subclass_of` で親クラスを指す。親は複数でもよい。循環は検出して警告する。
- クラスページには、下位クラスのものを含むインスタンスの一覧が出る。

### プロパティ

- プロパティはワークスペース内で名前が一意で、プロパティ自身もページ。同じ名前は同じ意味を持ち、意味が違うなら名前を変える。
- クラスは `properties` で「提案するプロパティ」を宣言する。
- 値の種類はプロパティ側が持つ。`number`、`date`、`string`、`link` のいずれかで、複数の値も持てる。
- 種類に合わない値は警告だけで、保存は通す。
- プロパティのページは必須ではない。定義がなくても、どのページにも自由にキーを足せる。
- 値がリンクのプロパティは、型付きの関係になる。逆向きは保存せず、参照先のページにプロパティ名ごとにまとめて表示する。

## 予約語

利用者のプロパティ名には使えないキーです。コードでは `@brainoid/core` の `RESERVED_KEYS` を使います。

| キー          | 書く場所       | 意味                             | RDFでの対応                          |
| ------------- | -------------- | -------------------------------- | ------------------------------------ |
| `type`        | すべてのページ | ページのクラス。複数可           | `rdf:type`                           |
| `subclass_of` | クラス         | 親クラス。複数可                 | `rdfs:subClassOf`                    |
| `properties`  | クラス         | 提案するプロパティ               | schema.orgの `domainIncludes` に近い |
| `value_type`  | プロパティ     | 値の種類                         | `rdfs:range`                         |
| `range`       | プロパティ     | リンクの値が属するクラス         | 未決                                 |
| `choices`     | プロパティ     | 入力時の候補。強制しない         | なし                                 |
| `same_as`     | すべてのページ | 外部の語彙やデータベースのIRI    | 未決                                 |
| `aliases`     | すべてのページ | 別名。リンクの候補を引くのに使う | なし                                 |

`properties` を `rdfs:domain` に対応させないのは、`rdfs:domain` が制約ではなく推論の規則だからです。

## 解決の規則

実装は `@brainoid/core` に置きます（T-031）。

1. **インスタンス**：クラスCのインスタンスは、`type` にCまたはCの子孫クラスを持つページ。
2. **提案されるプロパティ**：ページの全クラスと、その祖先クラスが宣言したものの和集合。重複は1つにまとめる。
3. **並び**：祖先を先に、`type` に書いた順に並べる。
4. **未入力**：提案されているが値のないプロパティは、画面には「未入力」として出し、Markdownには書き出さない。
5. **循環**：`subclass_of` が循環していても止まらない。循環に含まれるクラスには警告を出す。
6. **自動の型付け**：プロパティに `range` があるとき、その値として新しく作られたページには `range` のクラスを付ける（T-044）。

## Yjsドキュメントの構造（案）

1ページが1つのYjsドキュメントです。文書名は `<workspaceId>/<pageId>`（`apps/sync/src/document-name.ts`）。

| 名前        | 型                          | 中身                                       |
| ----------- | --------------------------- | ------------------------------------------ |
| `root`      | `@lexical/yjs` が管理する型 | 本文。直接は触らない                       |
| `props`     | `Y.Map`                     | プロパティ。キーはプロパティ名または予約語 |
| `proposals` | `Y.Map`                     | 未承認の提案。キーは提案ID                 |

`props` の値は次のどちらかにします。

- **1つだけの値**：そのままのJSON。同時に書かれたら、全員の画面で同じ一方に収束する。
- **複数の値**：`Y.Array`。同時に足された値は両方残る。

値1つの形は次のとおりです。

```ts
type PropertyValue =
  | { kind: 'link'; pageId: string }
  | { kind: 'string'; value: string }
  | { kind: 'number'; value: number }
  | { kind: 'date'; value: string }; // YYYY-MM-DD
```

タイトルはここに入れません。Postgresの `pages.title` が正です。

## Postgresの表（案）

| 表             | 主な列                                                     | 役割                                                     |
| -------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `users`        | id、email、name                                            | 人                                                       |
| `workspaces`   | id、name、agent_access_enabled                             | ワークスペース                                           |
| `memberships`  | workspace_id、user_id、role                                | 役割は owner、editor、viewer                             |
| `pages`        | id、workspace_id、title、deleted_at                        | `(workspace_id, title)` に一意制約                       |
| `page_docs`    | page_id、state（bytea）、updated_at                        | Yjsの状態。正本                                          |
| `page_index`   | page_id、markdown、plain_text                              | 書き出し用のMarkdownと、検索用の本文                     |
| `page_props`   | page_id、key、position、kind、value_text、value_page_id    | プロパティの索引。`type` などの予約語も同じ表に入れる    |
| `page_links`   | source_page_id、target_page_id、target_title               | 本文のリンクの索引。まだないページは `target_title` だけ |
| `proposals`    | id、page_id、key、value、proposed_by、status、decided_by   | 提案と、承認や却下の記録                                 |
| `agent_tokens` | id、workspace_id、name、permission、token_hash、revoked_at | トークン。平文は保存しない                               |
| `edit_log`     | page_id、actor_kind、actor_id、at                          | 誰が書いたか（人かエージェントか）                       |
| `access_log`   | token_id、action、page_id、at                              | トークンの読み取りの記録                                 |

`page_docs` 以外の索引は、Yjsの状態から作り直せます。壊れたら再構築できるようにしておきます。

## ID

IDは接頭辞つきの文字列にします（案）。ワークスペースは `ws_`、ページは `pg_`、ユーザーは `us_`、トークンは `tk_`、提案は `pr_`。本体は時刻順に並ぶもの（ULIDなど）を使います。ページのIRIは、タイトルではなくこのIDから作ります。

## 未決

- **クラスのページの識別**：`type` で明示するか、`subclass_of` や `type` からの参照で推定するか。T-031で決める。
- **`range` と `same_as` の書き出し**：RDFにするときの述語。v1の機能には影響しない。
