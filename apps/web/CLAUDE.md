# apps/web（画面）

画面は [Astryx](https://github.com/meta/astryx) の部品とトークンで作る。決めた理由は `docs/adr/0011-astryx-design-system.md`、画面ごとの部品の対応は `docs/design/ui.md` にある。

## 書く前に

1. `docs/design/ui.md` で、その画面の構成、動き、使う部品の案を読む。構成と動きの基準はUIプロトタイプ。
2. Astryxの部品を探す。あるものは作らない。
3. 部品にない振る舞い（エディタの中、キーボード操作、フォーカス、性能、セキュリティ）は、Modern Web Guidanceの指針を引いてから書く。
4. 見た目がプロトタイプと食い違ったら、Astryxに合わせる。

## コマンド

リポジトリの直下からは `pnpm astryx <cmd>`、このフォルダの中では `pnpm exec astryx <cmd>` で同じものが動く。

```bash
pnpm astryx search "<探したいもの>"   # 部品、フック、文書、テンプレートをまとめて探す
pnpm astryx component <名前>          # 使う前に、propsと例を読む
pnpm astryx build "<作りたい画面>"    # 新しい画面は、テンプレートを選ぶところから
pnpm astryx docs tokens               # トークンの一覧
pnpm astryx doctor                    # 設定の診断
pnpm theme:build                      # テーマを変えたあとに作り直す
```

## 決まり

- 色、余白、文字の大きさを直書きしない。部品のpropsで決め、足りなければトークン（`var(--color-*)` など）を使う。
- 色を足すときは、テーマ（`src/themes/brainoid/brainoidTheme.ts`）に足す。`:root` に変数を置かない。
- `src/astryx-themes.ts` と、`src/themes/brainoid/` の生成物（`brainoid.css`、`brainoid.js`、`*.d.ts`、`brainoid.palette.ts`）は手で直さない。
- 部品は、それぞれの入口から読み込む（`@astryxdesign/core/Button`）。`pnpm astryx component <名前>` が出すパスを使う。
- アプリ内の移動は、Astryxの `Link` か、部品の `href` を使う。ルーターとは `LinkProvider` でつなぐ（T-004）。
- 提案（未承認のもの）には `warning` のトークンを使い、ほかの用途には使わない。色だけで区別せず、破線の枠と「提案」の文字も添える。
- Astryxのパッケージを上げるときは、`@astryxdesign/*` を全部同じ版にする（`docs/dev/setup.md`）。

以下は `astryx init` が書き込む欄で、`astryx upgrade` が更新する。手で直さない。

<!-- ASTRYX:START -->
Astryx v0.7.14 · 174 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — start every page from a template, never from scratch:
1. `astryx build "<idea>"` — names the template to scaffold from and the parts it lacks.
2. `astryx template <name> <path>` — scaffold it; keep its frame, gap and padding; replace the content.
3. `astryx template <Block>` for parts it lacks; `astryx component <Name>` to read props before using one.
Changing an existing page? Keep it: skip step 2 and add blocks/components inside its sections.
Before you deliver a build, run `astryx doctor --built <dir>`; don't deliver it if it fails.

RULES:
- No <div> — components handle all layout and spacing.
- Read `astryx docs layout` before changing a template's frame.
- Dense data = rows (Table, List/Item), not Card-wrapped lists. Badge = counts only.
- Style with component props first, then tokens (var(--color-*|--spacing-*|--radius-*)). No raw hex/px. No StyleX/Tailwind compiler here — don't use xstyle/utility classes directly. Some templates use StyleX and need a compiler plugin; see `astryx docs styling-overview`.
- Palettes and custom colors go through the theme, never :root overrides. Run `astryx theme add <slug>` to import; `theme eject <slug>` only forks source. See `astryx docs theme`.
- SELF-CHECK: re-read the file; replace any raw <div>/<span>, imported .css/@apply, or hardcoded #hex/px with the component or a token.

`astryx help` lists every command. Key ones beyond the workflow:
  search "<query>"   find any component / hook / doc / template
  discover <words>   integrations you could add
  docs <topic>       getting-started, principles, tokens, theme … (`astryx docs` lists all)
  docs cli           commands and API reference
  docs authoring     build an integration package, and every field it holds
  upgrade --from <old version> --apply   run after a dependency bump
<!-- ASTRYX:END -->
