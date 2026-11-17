---
id: T-014
title: 検証の結果を設計に反映する
status: todo
milestone: M1
size: S
depends_on: [T-011, T-012, T-013]
owner:
---

## 目的

M1で分かったことを設計書とチケットに書き戻し、M2以降の前提を固める。

## 参照

- [データモデル](../design/data-model.md)
- [共同編集と保存](../design/sync.md)
- [Markdownの形式](../design/markdown-format.md)

## やること

- `data-model.md` の「Yjsドキュメントの構造」から「案」を外すか、直す
- `sync.md` と `markdown-format.md` を、実際の動きに合わせる
- ADR-0002（バインディング）とADR-0005（正本）を見直す
- M2以降のチケットのうち、前提が変わったものを直す

## やらないこと

- 新しい機能

## 受け入れ条件

- [ ] 設計書の「案」のうち、M1で確かめた箇所が確定になっている
- [ ] 前提が変わったチケットが更新されている
- [ ] 残った未決事項が一覧になっている

## 未決事項

なし
