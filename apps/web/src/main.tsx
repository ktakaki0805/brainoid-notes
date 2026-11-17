import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';

import { Theme } from '@astryxdesign/core/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { defaultThemeSlug, themes } from './astryx-themes';

const root = document.getElementById('root');
if (!root) throw new Error('#root がありません');

// UIプロトタイプはライトだけで作ってあるので、いまはライトに固定している。
// ダークモードを出すと決めたら mode="system" にする（docs/design/ui.md）。
createRoot(root).render(
  <StrictMode>
    <Theme theme={themes[defaultThemeSlug]} mode="light">
      <App />
    </Theme>
  </StrictMode>,
);
