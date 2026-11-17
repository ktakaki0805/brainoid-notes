# ADR-0012: Modern Web Guidanceを入れ、対応ブラウザをBaseline 2026にする

- 状態：採用
- 日付：2026-11-13

## 状況

コーディングエージェントは、学習したときに多かった古い書き方でHTML、CSS、JavaScriptを書きやすい。この製品は主にClaude Codeで作るので、いまのWebの書き方を参照できるようにしておきたい。

あわせて、対応ブラウザを決める必要がある。Astryx（[ADR-0011](0011-astryx-design-system.md)）が新しいWebの機能に依存しており、どこまでフォールバックを書くかが対応ブラウザで変わるためである。

## 決定

1. [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) を、Claude Codeのプラグインとして使う。リポジトリの `.claude/settings.json` で有効にしてある。
2. 対応ブラウザは **Baseline 2026** にする。Astryxが「すべて正しく動く」とする範囲（Chrome 125以降、Edge 125以降、Safari 26以降、Firefox 147以降）と同じである。`CLAUDE.md` に1行で書いてあり、Modern Web Guidanceはそれを読む。
3. 画面を書くときの優先順位は、Astryxの部品が先、Modern Web Guidanceがその次にする。Astryxに部品があるものを、素のHTMLとCSSで作り直さない。

## 理由

- v1の利用者は自分たちのチームで、新しいブラウザを使える
- Astryxのメニュー、候補の一覧、ツールチップを正しい位置に出すには、CSS anchor positioningが要る。これがBaseline 2026で、対応ブラウザの下限を決めている
- プラグインにすると、指針のファイルをリポジトリに抱えずに済み、更新も受け取れる
- 指針は手元の検索で引かれ、必要なものだけが読み込まれる

## 影響

- **各自、最初に1回だけプラグインを入れる。** リポジトリの設定だけでは入らない（手順は `docs/dev/setup.md`）
- **利用の情報がGoogleに送られる。** skillが実行するCLI（`npx modern-web-guidance@latest`）は、エージェントが作った検索語、読んだ指針のID、エージェントの名前を、匿名で送る。利用者が打った文は送られない。止めるには、各自の環境で `DISABLE_TELEMETRY=1` を設定する
- **実験的な機能の指針は使えないままにしてある。** Origin Trialや、1つのブラウザだけにある機能を使うと決めたら、`.mwgrc` を足してこのADRに追記する
- **対応ブラウザを広げるとき**（古いSafariなど）は、このADRを置き換えるADRを書き、`CLAUDE.md` の1行を直す。Astryxの重なる部品の位置が崩れるので、その対処も決める

## 見送ったこと

- **skillのファイルをリポジトリに置く**（`npx modern-web-guidance@latest install`）：見送り。指針のファイルが200を超え、更新のたびに差分が大きくなる。Claude Code以外のエージェントを使う人は、各自この方法で入れる
- **Baselineの既定（Widely available）のままにする**：見送り。Astryxが必要とする機能にフォールバックを書くことになり、書いても部品の位置は直らない
