# ADR-0013: 開発環境はmiseでそろえる

- 状態：採用
- 日付：2026-11-13

## 状況

複数人が、それぞれの手元とClaude Codeで開発する。Node.jsとpnpmの版がずれると、手元では通るのにCIで落ちる、といったことが起きる。これまでは `.nvmrc` と `package.json` の `packageManager` に版を書き、各自がそれに合わせていた。

## 決定

[mise](https://mise.jdx.dev/) で開発環境をそろえる。リポジトリの `mise.toml` に、次の3つを書く。

- **道具の版**：Node.jsとpnpm。版は完全に固定する
- **環境変数**：手元の `.env` を読み込んで、コマンドに渡す
- **最初のセットアップ**：`mise run setup`

日々のコマンドは、これまでどおり `pnpm` で実行する（`pnpm dev`、`pnpm check`）。miseのタスクに写さない。

## 理由

- 1つのファイルで、手元、Claude Code、CIが同じ版を使う
- 新しい人が、`mise run setup` だけで動かせる
- `.env` の読み込みを道具に任せられ、アプリに読み込みの処理を持たなくて済む
- Claude Code向けの組み込み方が、miseの文書に載っている

## 影響

- **`.nvmrc` は削除した。** 版の正は `mise.toml` である
- **pnpmの版は2か所にある。** `mise.toml` と、`package.json` の `packageManager`。上げるときは両方を直す
- **アプリは `.env` を読まない。** 環境変数はmiseが渡す。miseを通さずに起動すると、`.env` の値は入らない
- **Claude Codeには、フックで効かせる。** Claude Codeのコマンドには、対話用のシェルの設定が効かない。セッションの開始時に `.claude/hooks/mise-env.sh` が動き、コマンドのたびにmiseの環境が読み込まれるようにする
- **CIは `jdx/mise-action` で道具を入れる。**
- **Dockerはmiseの対象外。** Postgresは、これまでどおり `docker compose` で動かす
- **`mise.lock` は、まだ入れていない。** 版は固定してあるが、ダウンロードするファイルのチェックサムまでは固定していない。固定するなら `mise lock` で作ってコミットする（`docs/dev/setup.md`）
