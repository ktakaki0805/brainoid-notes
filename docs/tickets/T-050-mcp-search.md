---
id: T-050
title: MCP：検索
status: todo
milestone: M3
size: S
depends_on: [T-037, T-049]
owner:
---

## 目的

エージェントが、全文検索を使えるようにする。

## 参照

- [エージェント連携](../design/mcp.md)

## やること

- `search_pages` を実装する
- 結果に、型と、一致した箇所を付ける

## やらないこと

- 検索の並びの作り込み

## 受け入れ条件

- [ ] 読み取りのトークンで呼べる
- [ ] 結果から `get_page` に進める形（IDとタイトル）で返る

## 未決事項

なし
