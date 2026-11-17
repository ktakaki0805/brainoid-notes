# 手元で動かす

## 必要なもの

| もの   | 備考                                                                               |
| ------ | ---------------------------------------------------------------------------------- |
| mise   | Node.jsとpnpmを、`mise.toml` に書いた版で入れる。自分でNode.jsやpnpmを入れなくてよい |
| Docker | Postgresを動かすのに使う。miseの対象外なので、別に入れておく                       |

## 最初の1回

miseを入れて、シェルで有効にします。

```bash
curl -fsSL https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc   # bashなら activate bash を ~/.bashrc に
```

Homebrewなどで入れる方法は、[miseの文書](https://mise.jdx.dev/installing-mise.html)にあります。シェルを開き直したら、リポジトリの直下で次を実行します。

```bash
mise run setup     # Node.jsとpnpmを入れ、依存を入れ、.env を作り、Postgresを起動する
pnpm dev
```

`mise run` を実行すると、この `mise.toml` を信頼したことになります。初めてのときは、中身（道具の版、`.env` の読み込み、`setup` のタスク）を先に確かめてください。

`pnpm db:migrate` は、マイグレーションができてから実行します（T-001以降）。

## miseがしていること

`mise.toml` に、次の3つを書いてあります。決めた理由は [ADR-0013](../adr/0013-mise-dev-environment.md) にあります。

| 項目     | 内容                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| 道具の版 | Node.jsとpnpm。リポジトリの中では、この版の `node` と `pnpm` が使われる               |
| 環境変数 | `.env` を読み込んで、コマンドに渡す。アプリの中では `.env` を読まない                 |
| タスク   | `mise run setup` だけ。日々のコマンドは `pnpm` のまま（`pnpm dev`、`pnpm check` など） |

- **シェルで有効にしていないとき**は、`mise exec -- pnpm dev` のように、`mise exec --` を前に付ければ同じ環境で動く。
- **エディタやIDEから実行するとき**は、対話用のシェルの設定が効かない。`~/.zprofile` に `eval "$(mise activate zsh --shims)"` を足す（[miseの文書](https://mise.jdx.dev/dev-tools/shims.html)）。
- **自分だけの設定**は `mise.local.toml` に書く。コミットしない。
- **確かめ方**：`mise ls --current` で使われている版、`mise doctor` で設定の診断が見られる。

### 道具の版を上げる

1. `mise.toml` の版を書き換える。pnpmは、`package.json` の `packageManager` も同じ版に直す。
2. `mise install`
3. `pnpm install` と `pnpm check`

版は完全に固定してありますが、ダウンロードするファイルのチェックサムまでは固定していません。固定するなら、`mise.toml` の `[settings]` に `lockfile = true` を足し、`mise lock --platform linux-x64,macos-arm64` で `mise.lock` を作ってコミットします（チームが使うOSを並べる）。

## 毎日使うコマンド

```bash
pnpm dev           # web、api、sync をまとめて起動
pnpm check         # lint、型チェック、テスト、チケットの整合性
pnpm test          # テストだけ
pnpm test:watch    # 変更を見張ってテスト
pnpm format        # 整形とlintの自動修正
pnpm astryx search "<探したいもの>"   # Astryxの部品や文書を探す
pnpm theme:build   # テーマを変えたあとに、生成物を作り直す
```

1つのアプリだけ動かすときは、`pnpm --filter @brainoid/api dev` のように指定します。

## Claude Codeの準備

リポジトリの `.claude/settings.json` に、チーム共通の許可と、Modern Web Guidance のプラグインの指定が入っています。最初に1回だけ、次を行います。

1. `mise run setup` を済ませてから、リポジトリの直下でClaude Codeを起動し、フォルダを信頼する。プラグインの配布元（`googlechrome`）が自動で登録される。
2. プラグインを入れる。入っていないと、Claude Codeがこのコマンドを案内する。

   ```bash
   claude plugin install modern-web-guidance@googlechrome
   ```

3. Claude Codeを起動し直す。画面（HTML、CSS、ブラウザで動くJavaScript）を書くときに、指針が自動で引かれる。

Claude Code以外のエージェントを使う人は、`npx modern-web-guidance@latest install` で各自の環境に入れます。

### 知っておくこと

- **Claude Codeのコマンドにも、miseの環境が効く。** セッションの開始時に `.claude/hooks/mise-env.sh` が動き、コマンドのたびに `mise.toml` の道具と環境変数が読み込まれる。Claude Codeのコマンドには対話用のシェルの設定が効かないので、フックで補っている（[miseの文書](https://mise.jdx.dev/agents.html)）。道具が入っていないと効かないので、先に `mise run setup` か `mise install` を済ませる。
- **利用の情報がGoogleに送られる。** Modern Web GuidanceのCLIは、エージェントが作った検索語（「light dismiss dialog」のような短い語句）、読んだ指針のID、エージェントの名前を、匿名で送る。利用者が打った文は送られない。止めるには、シェルの設定に `export DISABLE_TELEMETRY=1` を足す。
- **対応ブラウザは `CLAUDE.md` に書いてある。** Modern Web Guidanceは、その1行を読んで、フォールバックを書くかどうかを決める。
- **Astryxの使い方は `apps/web/CLAUDE.md` にある。** 後半の `ASTRYX:START` から `ASTRYX:END` までは、AstryxのCLIが書き込む欄で、手で直さない。

## Astryxを上げる

Astryxはベータ版で、ほぼ毎日リリースがあります。版は固定してあるので、上げるときは次の順で進めます。

1. `apps/web/package.json` の `@astryxdesign/core`、`@astryxdesign/theme-neutral`、`@astryxdesign/cli` を、同じ版に書き換える。1つだけ上げない。
2. `pnpm install`
3. `pnpm astryx upgrade --from <上げる前の版> --apply`（コードの書き換えと、`CLAUDE.md` と `AGENTS.md` の中のAstryxの欄の更新）
4. `pnpm theme:build`（テーマの生成物を作り直す）
5. `pnpm check` と、画面の目視

公開されたばかりの版は、pnpmが避けます（下の「pnpmの設定で知っておくこと」）。数日前の版を選べば、除外の設定を足さずに済みます。

## 動いているかの確かめ方

| 確かめるもの | 方法                                                            |
| ------------ | --------------------------------------------------------------- |
| Web          | http://localhost:5173 を開く                                    |
| APIサーバー  | `curl http://localhost:8787/health` が `{"status":"ok"}` を返す |
| 同期サーバー | 起動時に `Hocuspocus ... running at` と出る                     |
| Postgres     | `docker compose ps` で `healthy` になっている                   |

## pnpmの設定で知っておくこと

- **インストール時のスクリプトは、許可したものしか動かない。** 許可は `pnpm-workspace.yaml` の `allowBuilds` に書く。いまは `esbuild` だけを動かしている。Astryxのcoreとcliのスクリプトは、初期設定の案内を表示するだけなので、動かさない設定（`false`）にしてある。新しい依存が許可を求めたら、中身を確かめてから足す。
- **公開されたばかりの版は入らない。** pnpmは、公開から間もない版を避けて解決する。最新版が入らなくても、数日待てば入る。急ぐ理由がなければ、除外の設定は足さない。

## データベース

- 開発用のPostgresは `docker-compose.yml` にある。日本語の全文検索に使うPGroonga入りのイメージを使っている。
- スキーマは `packages/db/src/schema/` に書き、`pnpm db:generate` でマイグレーションを作り、`pnpm db:migrate` で当てる。
- データを捨ててやり直すときは `docker compose down -v`。

## うまくいかないとき

| 症状                                                 | 確かめること                                                          |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| `node` や `pnpm` が見つからない、版が違う            | `mise install` を実行する。`mise ls --current` で、使われている版を見る |
| miseが「信頼されていない」と言う                     | `mise.toml` の中身を確かめてから、`mise trust` を実行する             |
| `.env` の値が効かない                                | miseを通して起動しているか（シェルで有効にする、または `mise exec --`） |
| `pnpm install` が `ERR_PNPM_IGNORED_BUILDS` で止まる | 新しい依存がスクリプトの許可を求めている。上の `allowBuilds` を参照   |
| Webに「APIサーバーにつながりません」と出る           | `pnpm dev` でapiが起動しているか。ポート8787がほかで使われていないか  |
| 同期サーバーが「本番では起動できません」と言う       | `NODE_ENV=production` になっている。認証（T-025）が入るまでの安全装置 |
| `pnpm check` が `theme:check` で落ちる               | `pnpm theme:build` を実行し、生成物も一緒にコミットする               |
| 画面の書体が変わらない                               | 書体はGoogle Fontsから読み込む。つながらない環境では、OSの書体になる  |
| 部品に色や形が付かない                               | `main.tsx` の2つのCSSの読み込みと、`Theme` で包んでいるかを確かめる   |
| Claude Codeが Modern Web Guidance を使わない         | 上の「Claude Codeの準備」の2と3。`/plugin` で入っているかを確かめる   |
