---
id: T-011
title: Markdownとの変換（リンクとfrontmatter）と往復テスト
status: todo
milestone: M1
size: M
depends_on: [T-010]
owner:
---

## 目的

「読み込んで書き出すと元と同じになる」をテストで保証する。v1の約束の中心になる。

## 参照

- [Markdownの形式](../design/markdown-format.md)
- [データモデル](../design/data-model.md)

## やること

- ページ間リンクの変換規則（`[[タイトル]]`、`[[タイトル|表示]]`）を `transformers.ts` に足す
- frontmatterの読み書きを `packages/core` に書く（キーの順番、値の書き方、複数の値）
- ページ1枚を「frontmatter + 本文」に直す関数と、その逆を書く
- 往復テストに例を足す（リンク、表示名つき、frontmatterあり、なし、空の本文）
- 規則どおりでないMarkdownが1回目の書き出しで直り、2回目で変わらないことを確かめる

## やらないこと

- ファイルやzipの入出力（T-035、T-060）
- タイトルとページIDの引き当て（呼び出す側が渡す）

## 受け入れ条件

- [ ] `markdown-format.md` の例が、そのまま往復テストに入っていて通る
- [ ] サーバー（Node.js）で、DOMなしに変換できる
- [ ] 対応していない記法を読んだとき、黙って捨てずに、何が落ちたかを返す

## 未決事項

- YAMLのライブラリを使うか、限った形だけを自前で読むか
