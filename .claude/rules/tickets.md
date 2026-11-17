---
paths:
  - "docs/tickets/**"
---

# チケットを触るとき

- 書式は `docs/tickets/_template.md` に合わせる。先頭の欄は、`scripts/tickets.mjs` が読むので崩さない。
- `status` は `todo`、`in-progress`、`done` のどれか。`in-progress` のときは `owner` を書く。
- 受け入れ条件は、あとから緩めない。満たせないと分かったら、理由を書いて相談する。
- 完了したチケットは消さない。範囲を変えるときは、変えた理由を本文に残す。
- 変えたら `pnpm tickets:check` を通す。
