---
id: T-026
title: 保存時に索引を更新する
status: todo
milestone: M2
size: M
depends_on: [T-011, T-013, T-025]
owner:
---

## 目的

保存のたびに、Markdown、プロパティ、リンクの索引を書き直す。読み取りは、すべてこの索引を見る。

## 参照

- [共同編集と保存](../design/sync.md)
- [データモデル](../design/data-model.md)
- [Markdownの形式](../design/markdown-format.md)

## やること

- Yjsの状態から、Markdown、検索用の本文、プロパティ、リンクを取り出す関数（headlessのLexical）
- `onStoreDocument` で、索引の表を1つのトランザクションで置き換える
- 全ページの索引を作り直すコマンド
- 取り出しに失敗しても保存は成功させ、失敗を記録する

## やらないこと

- 一覧やバックリンクのAPI（T-032、T-034）
- 全文検索（T-049）

## 受け入れ条件

- [ ] 本文にリンクを足して保存すると、`page_links` に入る
- [ ] プロパティを変えて保存すると、`page_props` が変わる
- [ ] 索引を全部消して作り直すと、元と同じになる
- [ ] `type` と `subclass_of` も、`page_props` から引ける

## 未決事項

なし
