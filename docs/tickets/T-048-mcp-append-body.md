---
id: T-048
title: MCP：本文への追記
status: todo
milestone: M3
size: M
depends_on: [T-047]
owner:
---

## 目的

エージェントが、本文の末尾に追記できるようにする。人の入力を潰さない。

## 参照

- [エージェント連携](../design/mcp.md)
- [共同編集と保存](../design/sync.md)
- [Markdownの形式](../design/markdown-format.md)

## やること

- `append_to_body` を実装する（Markdownを受け取り、headlessのLexicalをその文書につないで、末尾に足す）
- 本文のYjsを直接書かない
- 追記の中のリンクを解決する

## やらないこと

- 本文の書き換え、挿入、削除

## 受け入れ条件

- [ ] 人が打っている最中に追記しても、人の入力が消えない
- [ ] 追記した内容が、規則どおりのMarkdownとして書き出される
- [ ] 追記の中の `[[タイトル]]` がリンクになる

## 未決事項

なし
