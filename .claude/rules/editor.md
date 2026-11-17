---
paths:
  - "packages/editor/**"
  - "apps/web/src/editor/**"
---

# エディタを触るとき

- ノードは、Markdownで表せるものだけを足す。足すときは、`transformers.ts` の変換規則と、`markdown.test.ts` の往復テストを同じコミットで足す。
- ノードと変換規則は `packages/editor` に置く。ブラウザとサーバーで同じものを使うため、`apps/web` の中に別の定義を作らない。
- 本文のYjs（`root`）を直接読み書きしない。本文を変えるときは、Lexicalの `editor.update()` を通す。
- Lexicalのパッケージは、すべて同じ版に固定する（`^` を付けない）。版がずれると、Lexicalが2つ入って動かなくなる。
- 日本語入力の変換中（`isComposing`）は、Enterや記号での変換を動かさない。
- 形式の約束は `docs/design/markdown-format.md`、動きの基準は `docs/design/ui.md` にある。
