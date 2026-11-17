import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';
import { palette } from './brainoid.palette';

/*
 * Brainoid Notes のテーマ。Astryx の neutral を土台に、次の2点だけを変えている。
 *
 * - アクセント色：UIプロトタイプで決めた緑（#0B6E5F）から作ったパレット
 * - 書体：日本語が入る IBM Plex Sans JP と、コード用の IBM Plex Mono
 *
 * 余白、角丸、文字の大きさ、状態の色は neutral のまま使う。
 * 変えたら `pnpm theme:build` で作り直し、生成物も一緒にコミットする（docs/design/ui.md）。
 */

const { brand } = palette;

// 書体が読み込めなかったときに、OSの日本語フォントへ落ちるようにする
const SANS_FALLBACKS =
  '"Hiragino Sans", "Yu Gothic UI", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const brainoidTheme = defineTheme({
  name: 'brainoid',
  extends: neutralTheme,

  // typography は土台の設定を丸ごと置き換えるので、大きさの段階も書き直している（neutral と同じ値）
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: { family: 'IBM Plex Sans JP', fallbacks: SANS_FALLBACKS },
    heading: {
      family: 'IBM Plex Sans JP',
      fallbacks: SANS_FALLBACKS,
      weights: { 3: 'bold', 4: 'bold' },
    },
    code: {
      family: 'IBM Plex Mono',
      fallbacks: 'ui-monospace, "SF Mono", Consolas, monospace',
    },
  },

  // [ライト, ダーク] の組で書く
  tokens: {
    '--color-accent': [brand.light[40], brand.dark[70]],
    '--color-accent-muted': [brand.light[90], brand.dark[25]],
    '--color-on-accent': [brand.light[100], brand.dark[5]],
    '--color-text-accent': [brand.light[40], brand.dark[75]],
    '--color-icon-accent': [brand.light[40], brand.dark[75]],
  },
});
