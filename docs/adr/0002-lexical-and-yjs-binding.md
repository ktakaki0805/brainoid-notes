# ADR-0002: エディタはLexical、Yjsのバインディングは @lexical/yjs

- 状態：採用
- 日付：2026-11-13

## 状況

共同編集できるエディタが要る。Lexicalには、Yjs 13向けの `@lexical/yjs` と、Yjs 14向けの `@lexical/y` がある。2つは保存形式が異なり、1つの文書はどちらか一方しか使えない。

## 決定

Lexicalを使い、バインディングは `@lexical/yjs`（Yjs 13）にする。Lexicalのパッケージは同じ版に固定する。

## 理由

- `@lexical/y` は実験的で、Yjs 14もリリース候補の段階にある
- HocuspocusがYjs 13を前提にしている
- headless版とMarkdownの変換が公式にそろっている

## 影響

- 正本はLexicalのノードの木で、Markdownは変換して作る
- 本文のYjsを直接書かない。コードによる編集もLexicalを通す
- Yjs 14に移るときは、保存済みの文書の移行が要る
