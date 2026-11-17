// エディタの定義を置くパッケージ。ブラウザ（apps/web）とサーバー（apps/api、apps/sync）の
// 両方から同じノードと変換規則を使うために、ここに集める。
export { createBodyEditor, editorToMarkdown, markdownToEditor } from './headless';
export { EDITOR_NODES } from './nodes';
export { MARKDOWN_TRANSFORMERS } from './transformers';
