---
id: T-015
title: Astryxのリッチテキスト部品を土台にするかを決める
status: todo
milestone: M1
size: S
depends_on: []
owner:
---

## 目的

Astryxには、Lexicalで作られたエディタの部品（`@astryxdesign/richtext`）がある。土台にできれば、エディタの見た目と基本の編集を自分たちで作らずに済む。使うか、自前で組むかを、M1の最初に決める。

## 参照

- [画面](../design/ui.md)
- [共同編集と保存](../design/sync.md)
- [Markdownの形式](../design/markdown-format.md)

## やること

- リポジトリの外に写しを作り、そこで `@astryxdesign/richtext` を入れて試す。Lexicalは、この部品が対応する版（いまは0.52系）にそろえる。試しのコードは `main` に入れない
- 独自のノード（ページ間リンク）と変換規則を、`nodes` と `transformers` で足せるかを確かめる
- `@lexical/yjs` の共同編集のプラグインを載せられるかを確かめる（最初の状態の渡し方、取り消しの履歴）
- 使えるノードを、Markdownで表せるものだけに絞れるかを確かめる（表、コードブロックの扱い）
- サーバーでの変換（`@astryxdesign/richtext/markdown`）が、索引づくりと書き出しに使えるかを確かめる
- Lexicalの版がこの部品に合わせて固定されることの影響を書き出す
- 結果をADRに書き（ADR-0002を直すか、新しく足す）、T-010〜T-012と `packages/editor` の方針を合わせる

## やらないこと

- エディタの本実装（T-010以降）

## 受け入れ条件

- [ ] 上の5つの確認それぞれに、「できる」「できない」「条件つき」の結論と、根拠（試したコードの要点）がADRに書いてある
- [ ] 使うか見送るかが、理由と一緒にADRに書いてある
- [ ] 使う場合、Lexicalの版をどうそろえるかが `docs/dev/conventions.md` に書いてある
- [ ] T-010〜T-012が、結論に合わせて直っている

## 未決事項

- 使うか、自前で組むか（このチケットで決める）
