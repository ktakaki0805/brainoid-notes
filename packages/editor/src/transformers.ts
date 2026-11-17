import {
  BOLD_STAR,
  HEADING,
  ITALIC_STAR,
  LINK,
  ORDERED_LIST,
  QUOTE,
  type Transformer,
  UNORDERED_LIST,
} from '@lexical/markdown';

/**
 * Markdownとの変換規則。読み込みと書き出しの両方でこの一覧だけを使う。
 * ページ間リンク（[[タイトル]]）の規則は T-011 で足す。
 */
export const MARKDOWN_TRANSFORMERS: Transformer[] = [
  HEADING,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  BOLD_STAR,
  ITALIC_STAR,
  LINK,
];
