---
paths:
  - "apps/sync/**"
---

# 同期サーバーを触るとき

- 文書名は `document-name.ts` の関数で組み立て、解析する。文字列を直接つながない。
- 接続の権限は、`onAuthenticate` で `can()` を通して確かめる。フックの中で役割を直接比べない。
- 索引の表（`page_index`、`page_props`、`page_links`）は、保存の処理だけが書く。Yjsの状態から作り直せる形を保つ。
- 索引の取り出しに失敗しても、Yjsの状態の保存は成功させる。失敗は記録する。
- Hocuspocus v4では、`onStoreDocument` に渡るのは `lastContext` と `lastTransactionOrigin`。接続に固有の値は渡らない。
- ログに、本文、トークン、Cookieを出さない。
- 設計は `docs/design/sync.md` にある。フックの使い方を変えたら、同じコミットで直す。
