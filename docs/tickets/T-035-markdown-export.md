---
id: T-035
title: Markdownの書き出し
status: todo
milestone: M2
size: M
depends_on: [T-026]
owner:
---

## 目的

1ページ、または全ページを、Markdownで持ち出せるようにする。

## 参照

- [Markdownの形式](../design/markdown-format.md)
- [画面](../design/ui.md)

## やること

- 1ページを書き出すAPIと、画面の「Markdown」タブ
- 全ページをzipで書き出すAPI
- ファイル名の規則（使えない文字の置き換え、重なったときの扱い）を決めて `markdown-format.md` に書く
- 承認前の提案は含めない

## やらないこと

- 取り込み（T-060）

## 受け入れ条件

- [ ] 書き出したファイルが、`markdown-format.md` の規則どおりになっている
- [ ] 全ページのzipを展開すると、ページ数と同じ数のファイルがある
- [ ] タイトルに `/` などを含むページも書き出せる
- [ ] 閲覧者も書き出せる

## 未決事項

なし
