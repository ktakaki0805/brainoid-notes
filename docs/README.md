# ドキュメント

| 文書                                                       | 答える問い                                   |
| ---------------------------------------------------------- | -------------------------------------------- |
| [product/spec.md](product/spec.md)                         | 何を作るのか。v1に何を入れ、何を入れないのか |
| [design/architecture.md](design/architecture.md)           | 部品は何で、データはどう流れるのか           |
| [design/data-model.md](design/data-model.md)               | ページ、クラス、プロパティをどう持つのか     |
| [design/markdown-format.md](design/markdown-format.md)     | Markdownにどう書き出し、どう読み込むのか     |
| [design/sync.md](design/sync.md)                           | 共同編集、保存、索引の更新はどう動くのか     |
| [design/api.md](design/api.md)                             | APIと権限はどうなっているのか                |
| [design/mcp.md](design/mcp.md)                             | エージェントは何ができるのか                 |
| [design/proposals.md](design/proposals.md)                 | 型付けと提案はどう流れるのか                 |
| [design/ui.md](design/ui.md)                               | 画面はどう見え、どう動くのか                 |
| [design/security.md](design/security.md)                   | 権限、トークン、AIへのデータの渡し方         |
| [design/research-template.md](design/research-template.md) | 研究用のクラスとプロパティ                   |
| [adr/](adr/README.md)                                      | なぜそう決めたのか                           |
| [dev/setup.md](dev/setup.md)                               | 手元でどう動かすのか                         |
| [dev/workflow.md](dev/workflow.md)                         | チケットからコミットまで、どう進めるのか     |
| [dev/conventions.md](dev/conventions.md)                   | コードとテストをどう書くのか                 |
| [tickets/](tickets/README.md)                              | 何を、どの順番で実装するのか                 |

## 書くときの決まり

- 決まったことと、まだ決まっていないことを分けて書く。決まっていない箇所には「案」か「未決」と書く。
- 設計を変えるときは、該当する文書も同じコミットで直す。文書とコードが食い違ったら、それはバグとして扱う。
- 決定の理由が後から問われそうなら、ADRを足す。
