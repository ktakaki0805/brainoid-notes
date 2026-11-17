import { createHeadlessEditor } from '@lexical/headless';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import type { LexicalEditor } from 'lexical';
import { EDITOR_NODES } from './nodes';
import { MARKDOWN_TRANSFORMERS } from './transformers';

/** DOMなしで動くエディタ。サーバーでの変換と、エージェントによる追記に使う。 */
export function createBodyEditor(): LexicalEditor {
  return createHeadlessEditor({
    namespace: 'brainoid-body',
    nodes: [...EDITOR_NODES],
    onError: (error) => {
      throw error;
    },
  });
}

export function markdownToEditor(markdown: string): LexicalEditor {
  const editor = createBodyEditor();
  editor.update(
    () => {
      $convertFromMarkdownString(markdown, MARKDOWN_TRANSFORMERS);
    },
    { discrete: true },
  );
  return editor;
}

export function editorToMarkdown(editor: LexicalEditor): string {
  return editor.getEditorState().read(() => $convertToMarkdownString(MARKDOWN_TRANSFORMERS));
}
