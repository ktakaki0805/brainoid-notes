---
id: T-001
title: DBの接続とマイグレーションの土台
status: todo
milestone: M0
size: S
depends_on: []
owner:
---

## 目的

マイグレーションを作って当てる流れと、DBを使うテストのやり方を決める。以降のスキーマのチケットがこの形に乗る。

## 参照

- [データモデル](../design/data-model.md)
- [手元で動かす](../dev/setup.md)
- [コードとテストの書き方](../dev/conventions.md)

## やること

- `packages/db` に最初のマイグレーションを作る（PGroongaの拡張を有効にするだけのもの）
- `pnpm db:generate` と `pnpm db:migrate` が手元のPostgresで通ることを確かめる
- `mise run setup`（`mise.toml`）に `pnpm db:migrate` を足し、最初のセットアップでDBができるようにする
- DBを使うテストのやり方を決めて、例を1つ書く
- CIでPostgresを立てて、DBを使うテストを回す
- `docs/dev/conventions.md` の「DBを使うテスト」を、決めた方法に書き換える

## やらないこと

- 業務の表を足す（T-020、T-023）

## 受け入れ条件

- [ ] 空のDBに `pnpm db:migrate` を当てると成功し、2回目は何もしない
- [ ] DBを使うテストの例が、手元とCIの両方で通る
- [ ] PGroongaの拡張が有効になっている

## 未決事項

なし
