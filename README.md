# Brainoid Notes

チームのための小さなWikipediaです。人がScrapboxのように書き、AIが型を付け、エージェントがそれを読みます。中身はすべてMarkdownで持ち出せます。

いまはひな型の段階です。機能は `docs/tickets/` のチケットに沿って実装していきます。

## はじめかた

必要なもの：[mise](https://mise.jdx.dev/) とDocker。Node.jsとpnpmは、miseが `mise.toml` の版で入れます。

```bash
mise run setup  # Node.jsとpnpmを入れ、依存を入れ、.env を作り、Postgres（PGroonga入り）を起動
pnpm dev        # web: 5173 / api: 8787 / sync: 8788
```

miseの入れ方と、シェルで有効にする方法は [docs/dev/setup.md](docs/dev/setup.md) にあります。

ブラウザで http://localhost:5173 を開き、「APIサーバーにつながっています」と出れば動いています。

コミットの前に、次を通します。

```bash
pnpm check      # lint、型チェック、テスト、チケットの整合性、テーマの生成物
```

## 構成

| 場所              | 中身                                                 |
| ----------------- | ---------------------------------------------------- |
| `apps/web`        | 画面。Vite、React、Astryx（デザインシステム）、Lexical |
| `apps/api`        | APIサーバー。Hono。ログイン、権限、ページ、検索、MCP |
| `apps/sync`       | 同期サーバー。Hocuspocus。共同編集、保存、索引の更新 |
| `packages/core`   | ドメインの型と純粋なロジック                         |
| `packages/editor` | Lexicalのノードと、Markdownとの変換規則              |
| `packages/db`     | Postgresのスキーマと接続                             |
| `docs/`           | 仕様、設計、ADR、開発の進め方、チケット              |
| `.claude/`        | Claude Codeの設定、ルール、skill、サブエージェント   |

## 読む順番

1. [docs/product/spec.md](docs/product/spec.md)：何を作るか
2. [docs/design/architecture.md](docs/design/architecture.md)：どう作るか
3. [docs/dev/workflow.md](docs/dev/workflow.md)：チケットからコミットまでの進め方
4. [docs/tickets/README.md](docs/tickets/README.md)：チケットの一覧と読み方

ドキュメントの全体は [docs/README.md](docs/README.md) にまとめてあります。

## Claude Codeで進める

```text
/implement-ticket T-001     チケットを1つ、実装、レビュー、修正を繰り返して、mainにコミットする
/implement-tickets M0       複数のチケットを、1件ずつ順番に進める（範囲はマイルストーン、ID、件数で指定）
/create-ticket              新しい作業を、1コミットで入る大きさのチケットに分ける
```

着手できるチケットは `pnpm tickets:next` で確認できます。

実装とレビューは別々のサブエージェントが行い、レビューが通ったものだけが `main` にコミットされます。ブランチとPRは使いません。プッシュは人が行います（[docs/dev/workflow.md](docs/dev/workflow.md)）。

画面を書くときの指針として、Modern Web Guidance のプラグインを使います。最初に1回だけ入れる必要があります（[docs/dev/setup.md](docs/dev/setup.md) の「Claude Codeの準備」）。
