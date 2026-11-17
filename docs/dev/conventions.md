# コードとテストの書き方

整形とlintはBiomeに任せます。ここには、道具では決まらないことだけを書きます。

Markdownは、Biomeの対象から外してあります（`biome.json`）。BiomeのMarkdown整形は先頭のfrontmatterに空行を入れてしまい、チケットやskillの書式が崩れるためです。

## 言葉

- ドキュメント、コメント、コミット、テスト名は日本語。
- 識別子、ファイル名は英語。
- 用語は設計書にそろえる。ページ（page）、クラス（class）、プロパティ（property）、提案（proposal）、ワークスペース（workspace）、索引（index）。

## TypeScript

- `strict` と `noUncheckedIndexedAccess` を有効にしてある。添字で取った値は `undefined` かもしれない前提で書く。
- `any` と `as` は、理由をコメントに書けるときだけ使う。外から来た値は、zodで検証してから型を付ける。
- 型だけのimportには `import type` を使う（`verbatimModuleSyntax`）。
- 相対importに拡張子は付けない。ワークスペース内のパッケージは `@brainoid/*` で読む。
- 既定のexportは使わない。名前付きのexportにする（設定ファイルを除く）。
- エラーは握りつぶさない。起きうる失敗は戻り値で表し、起きてはいけないものは投げる。

## 置き場所

| 書くもの                          | 置き場所          |
| --------------------------------- | ----------------- |
| DBもLexicalも要らないロジック     | `packages/core`   |
| Lexicalのノード、Markdownとの変換 | `packages/editor` |
| テーブルの定義、クエリの部品      | `packages/db`     |
| HTTPのルート、MCPのツール         | `apps/api`        |
| Hocuspocusのフック                | `apps/sync`       |
| 画面                              | `apps/web`        |

迷ったら、まず `packages/core` に純粋な関数として書けないかを考えます。テストが軽くなり、ブラウザとサーバーの両方から使えます。

## テスト

- テストは実装の隣に `*.test.ts` として置く。Vitestを使う。
- **純粋なロジック**（`packages/core`）は、表にした入力と期待値で網羅する。
- **変換**（`packages/editor`）は、往復テストに例を足す。ノードや変換規則を足すときは、同じコミットで必ず足す。
- **API**（`apps/api`）は、サーバーを立てずに `app.request()` で呼ぶ。
- **DBを使うテスト**は、開発用のPostgresに対して実行する。やり方はT-001で決める。
- 実装の写しになるテストは書かない。外から見える動きを確かめる。
- バグを直すときは、先にそのバグで落ちるテストを書く。

## コメント

- 何をしているかはコードで分かるようにし、コメントにはなぜそうしたかを書く。
- 設計書やチケットを指すときは、パスかIDを書く（`docs/design/sync.md`、`T-025`）。
- あとでやることを残すときは、チケットのIDを付ける。IDのない `TODO` は残さない。

## 画面

- 部品、余白、色はAstryxのものを使う。部品を探してから書く（`pnpm astryx search`、`pnpm astryx component <名前>`）。
- 色、余白、文字の大きさを直書きしない。部品のpropsで決め、足りなければAstryxのトークンを使う。色を足すときはテーマに足す。
- 部品にない振る舞いを書くときは、Modern Web Guidanceの指針を引く。Astryxに部品があるものを、素のHTMLとCSSで作り直さない。
- 画面の構成と動きの基準はUIプロトタイプ。部品の対応と色の使い分けは `docs/design/ui.md`、書くときの決まりは `apps/web/CLAUDE.md`。
- 対応ブラウザはBaseline 2026。それより新しい機能を使うときは、使えないブラウザでの動きも書く。

## データベース

- スキーマの変更は、必ずマイグレーションと一緒にコミットする。
- 一度 `main` に入ったマイグレーションは書き換えない。直すときは新しいマイグレーションを足す。
- 索引の表（`page_index`、`page_props`、`page_links`）は、保存の処理だけが書く。

## 依存を足すとき

- 足す理由をコミットメッセージに書く。標準の機能や、すでに入っている依存で足りないかを先に確かめる。
- Node.jsとpnpmの版は `mise.toml` で決める。pnpmは、`package.json` の `packageManager` も同じ版にする。
- Lexicalのパッケージは版をそろえて固定する（`0.53.0` のように、`^` を付けない）。版がずれると、Lexicalが2つ入って動かなくなる。
- Astryxのパッケージ（`@astryxdesign/*`）も版を固定し、全部を同じ版にそろえる。テーマが、対応するcoreの版を1つだけ指定しているため。上げ方は `docs/dev/setup.md`。
- インストール時にスクリプトを動かす依存は、`pnpm-workspace.yaml` の `allowBuilds` に足す前に中身を確かめる。動かす必要がなければ `false` と書く。
