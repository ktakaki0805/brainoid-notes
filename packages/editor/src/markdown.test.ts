import { describe, expect, it } from 'vitest';
import { editorToMarkdown, markdownToEditor } from './headless';

// 「読み込んで書き出すと元と同じになる」ことを確かめる往復テスト。
// 変換規則やノードを足したら、ここに例を足す。
const cases: Array<[name: string, markdown: string]> = [
  ['段落', '本文です。\n\n二つ目の段落です。'],
  ['見出し', '# 見出し\n\n本文です。'],
  ['箇条書き', '- 一つ目\n- 二つ目'],
  ['番号付き', '1. 一つ目\n2. 二つ目'],
  ['強調', '**太字**と*斜体*を含む文。'],
];

describe('Markdownの往復', () => {
  it.each(cases)('%s', (_name, markdown) => {
    expect(editorToMarkdown(markdownToEditor(markdown))).toBe(markdown);
  });
});
