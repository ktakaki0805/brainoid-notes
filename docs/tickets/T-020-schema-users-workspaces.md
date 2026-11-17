---
id: T-020
title: スキーマ：ユーザー、ワークスペース、メンバー
status: todo
milestone: M2
size: S
depends_on: [T-001]
owner:
---

## 目的

人とワークスペースの表を作る。

## 参照

- [データモデル](../design/data-model.md)
- [APIと権限](../design/api.md)

## やること

- `users`、`workspaces`、`memberships` の表とマイグレーション
- IDの作り方（接頭辞つき）を `packages/core` に書く
- 役割は owner、editor、viewer の3つ
- 開発用のデータを入れるスクリプト（ユーザー2人、ワークスペース1つ）

## やらないこと

- ログイン（T-021）

## 受け入れ条件

- [ ] マイグレーションが通る
- [ ] 同じ人を、同じワークスペースに2回入れられない
- [ ] 開発用のデータを入れるスクリプトが、何度実行しても同じ結果になる

## 未決事項

- IDの形式（ULID、UUIDv7など）
