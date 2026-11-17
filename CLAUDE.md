# Brainoid Notes

チームのための小さなWikipedia。人が書き、AIが型を付け、エージェントが読む。中身はMarkdownで持ち出せる。

- 何を作るか：`docs/product/spec.md`
- どう作るか：`docs/design/`（入口は `architecture.md`）
- なぜそう決めたか：`docs/adr/`
- 何をいつ作るか：`docs/tickets/`

## コマンド

Node.jsとpnpmの版、環境変数（`.env`）は、miseが `mise.toml` に従って用意する。Claude Codeのコマンドには、フック（`.claude/hooks/mise-env.sh`）で効く。`node` や `pnpm` が見つからないときは `mise install` を実行する。

```bash
mise run setup           # 最初の1回：Node.jsとpnpm、依存、.env、Postgres
pnpm install
pnpm dev                 # web: 5173 / api: 8787 / sync: 8788
pnpm check               # lint + typecheck + test + tickets:check + theme:check。コミットの前に必ず通す
pnpm test                # 全テスト
pnpm test packages/core  # 一部だけ
pnpm format              # 整形とlintの自動修正
pnpm db:up               # Postgresを起動（Dockerが必要）
pnpm db:generate         # スキーマからマイグレーションを作る
pnpm db:migrate          # マイグレーションを当てる
pnpm tickets             # チケットの一覧
pnpm tickets:next        # 依存が片付いていて着手できるチケット
pnpm astryx <cmd>        # デザインシステム（Astryx）のCLI。部品を探す、仕様を読む
pnpm theme:build         # テーマを変えたあとに生成物を作り直す
```

## 構成

- `apps/web`：画面（Vite、React、Astryx、Lexical）。画面を書くときの決まりは `apps/web/CLAUDE.md`
- `apps/api`：APIサーバー（Hono）。ログイン、権限、ページ、検索、MCP
- `apps/sync`：同期サーバー（Hocuspocus）。共同編集、保存、索引の更新
- `packages/core`：ドメインの型と純粋なロジック。DBにもLexicalにも依存しない
- `packages/editor`：Lexicalのノードと、Markdownとの変換規則。webとサーバーで共有する
- `packages/db`：Postgresのスキーマ（Drizzle）と接続

依存の向きは `apps → packages`、`editor → core`、`db` は単独。`packages` から `apps` を読まない。

## 守ること

設計原則は `docs/product/spec.md` にある。コードを書くときに特に効くのは次の点。

1. **本文のYjsを直接書き換えない。** 本文を変えるときは必ずLexical（ブラウザ、またはサーバーのheadless）を通す。プロパティ用のマップは別なので直接書いてよい。
2. **書き込みの経路は1つ。** 人もエージェントも、変更は同期サーバーを通ってYjsドキュメントに入る。Postgresの索引は保存時に作り直すもので、直接書き換えない。
3. **読み取りは索引から。** 一覧、バックリンク、検索、MCPの読み取りはPostgresの索引を見る。
4. **タイトルだけはAPIで変える。** 「ワークスペース内で一意」はDBの制約で守る。Yjsには入れない。
5. **権限の確認は `can()` を通す。** ルートや関数の中で役割を直接比べない。
6. **スキーマは提案で、強制しない。** 型に合わない値も、定義のないプロパティも保存できる。エラーにせず警告にする。
7. **提案は承認されるまで事実ではない。** Markdownに書き出さず、エージェントには「未確認」として返す。
8. **ノードはMarkdownで表せるものだけ。** エディタにノードを足すときは、変換規則と往復テストを同じコミットで足す。
9. **製品からAIのAPIを呼ばない。** データがAIに渡るのは、利用者が発行したトークンでエージェントがつないだときだけ。
10. **フォルダ、テーブル表示、クエリUI、プラグインは作らない。** 対象外の一覧は仕様にある。

## 進め方

- 実装はチケット単位で行う。1チケットが1コミット。手順は `/implement-ticket <ID>`（まとめて進めるなら `/implement-tickets`）と `docs/dev/workflow.md`。
- ブランチとPRは使わない。`main` に直接コミットする。
- コミットの前に、実装とは別のサブエージェント（`ticket-reviewer`）のレビューを通す。書いた本人がレビューを兼ねない。
- 頼まれない限り、プッシュしない。プッシュは人がする。
- チケットの「やらないこと」には手を出さない。必要になったら、新しいチケットにする（`/create-ticket`）。
- 設計を変えるときは、`docs/design/` と、必要ならADRを同じコミットで更新する。
- 設計書に「案」「未決」と書いてある箇所は、実装の前に人に確認する。勝手に決めない。
- 迷ったら止めて聞く。受け入れ条件を満たせないまま「完了」にしない。

## 書き方

- ドキュメント、コメント、コミットは日本語。識別子とファイル名は英語。
- TypeScriptは `strict`。`any` と `as` は理由をコメントに書けるときだけ使う。
- 相対importに拡張子は付けない。ワークスペース内のパッケージは `@brainoid/*` で読む。
- テストは実装の隣に `*.test.ts` として置く。テスト名は日本語でよい。
- 詳細は `docs/dev/conventions.md`。

## 画面とブラウザ

- 画面は、デザインシステムのAstryxの部品とトークンで作る。色や余白を直書きしない。部品を探してから書く（`pnpm astryx search`）。
- 部品にない振る舞い（エディタの中、キーボード操作、フォーカス、性能、セキュリティ）を書くときは、Modern Web Guidanceの指針を引く。Astryxに部品があるものを、素のHTMLとCSSで作り直さない。
- **Browser Support:** This project's Baseline target is Baseline 2026.（対応ブラウザはBaseline 2026。Chrome 125以降、Edge 125以降、Safari 26以降、Firefox 147以降。理由は `docs/adr/0012-modern-web-guidance-and-baseline.md`）
