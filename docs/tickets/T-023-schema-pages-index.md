---
id: T-023
title: スキーマ：ページ、Yjsの状態、索引
status: todo
milestone: M2
size: M
depends_on: [T-020]
owner:
---

## 目的

ページと、その索引の表を作る。

## 参照

- [データモデル](../design/data-model.md)

## やること

- `pages`、`page_docs`、`page_index`、`page_props`、`page_links` の表とマイグレーション
- `(workspace_id, title)` の一意制約
- バックリンクとインスタンス一覧に効くインデックスを張る
- 表の定義を `data-model.md` に反映し、「案」を外す

## やらないこと

- 表を使う処理（T-024、T-025、T-026）
- 提案とトークンの表（T-040、T-036）

## 受け入れ条件

- [ ] マイグレーションが通る
- [ ] 同じワークスペースに、同じタイトルのページを作れない
- [ ] 別のワークスペースなら、同じタイトルを作れる

## 未決事項

なし
