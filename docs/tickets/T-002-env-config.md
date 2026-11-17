---
id: T-002
title: 環境変数の読み込みと検証
status: todo
milestone: M0
size: S
depends_on: []
owner:
---

## 目的

設定の間違いを起動時に見つける。各アプリが `process.env` をあちこちで読まないようにする。

## 参照

- [手元で動かす](../dev/setup.md)
- [権限、トークン、AI](../design/security.md)

## やること

- 環境変数のスキーマをzodで定義する（api、sync）
- 起動時に検証し、足りないものを変数名つきで示して止める
- `.env` はmiseが読み込む（`mise.toml` の `[env]`）。アプリの中では `.env` を読まず、渡された環境変数を検証するだけにする
- `.env.example` と `docs/dev/setup.md` を合わせる

## やらないこと

- 秘密の値を管理する仕組み（T-075）

## 受け入れ条件

- [ ] 必須の変数が欠けていると、変数名を示して起動に失敗する
- [ ] apiとsyncが、設定用のモジュール以外で `process.env` を読んでいない
- [ ] `mise run setup` のあとに、`pnpm dev` が動く

## 未決事項

なし
