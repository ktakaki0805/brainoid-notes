import { defineConfig } from 'vitest/config';

// テストは実装の隣に *.test.ts として置く。
// ブラウザのDOMが必要なテストを足すときは、そのパッケージ用の設定を projects に追加する。
export default defineConfig({
  test: {
    include: ['{apps,packages}/*/src/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
});
