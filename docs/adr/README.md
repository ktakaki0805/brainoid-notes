# ADR（設計上の決定の記録）

あとから「なぜこうなっているのか」と問われそうな決定を、1件1ファイルで残します。

| 番号                                            | 決定                                                         | 状態 |
| ----------------------------------------------- | ------------------------------------------------------------ | ---- |
| [ADR-0001](0001-typescript-monorepo.md)         | TypeScriptのモノレポにする                                   | 採用 |
| [ADR-0002](0002-lexical-and-yjs-binding.md)     | エディタはLexical、Yjsのバインディングは @lexical/yjs        | 採用 |
| [ADR-0003](0003-hocuspocus.md)                  | 同期サーバーはHocuspocusを自分たちで動かす                   | 採用 |
| [ADR-0004](0004-postgres-only.md)               | データはPostgresだけに置く                                   | 採用 |
| [ADR-0005](0005-yjs-is-source-of-truth.md)      | 正本はYjsドキュメント、Markdownは書き出しの形式              | 採用 |
| [ADR-0006](0006-workspace-level-permissions.md) | 権限はワークスペース単位、確認は can() に集約                | 採用 |
| [ADR-0007](0007-properties-are-pages.md)        | プロパティはワークスペースで一意、クラスもプロパティもページ | 採用 |
| [ADR-0008](0008-agents-propose-by-default.md)   | エージェントの既定は提案、製品からAIにデータを送らない       | 採用 |
| [ADR-0009](0009-dev-tooling.md)                 | 開発の道具はVite、Hono、Drizzle、Vitest、Biome               | 採用 |
| [ADR-0010](0010-tickets-in-repo.md)             | チケットはリポジトリの中のMarkdownで管理する                 | 採用 |
| [ADR-0011](0011-astryx-design-system.md)        | デザインシステムはAstryxを使う                               | 採用 |
| [ADR-0012](0012-modern-web-guidance-and-baseline.md) | Modern Web Guidanceを入れ、対応ブラウザをBaseline 2026にする | 採用 |
| [ADR-0013](0013-mise-dev-environment.md)        | 開発環境はmiseでそろえる                                     | 採用 |

## 足すとき

1. [0000-template.md](0000-template.md) を写し、次の番号と短い英語の名前を付ける。
2. 状況、決定、理由、影響を書く。検討して選ばなかった案があれば、理由に書く。
3. 上の表に1行足す。
4. 決定を変えるときは、古いADRを書き換えない。新しいADRを足し、古い方の状態を「ADR-00xxで置き換え」にする。

## 書くかどうかの目安

- 道具、ライブラリ、データの持ち方を選んだ、または替えた。
- 設計書の「案」や「未決」を確定させた。
- `CLAUDE.md` の「守ること」に関わる判断をした。

実装の細部や、すぐ変えられることは書きません。
