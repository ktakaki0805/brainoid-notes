import { describe, expect, it } from 'vitest';
import { formatDocumentName, parseDocumentName } from './document-name';

describe('文書名', () => {
  it('組み立てたものを読み戻せる', () => {
    const name = formatDocumentName({ workspaceId: 'ws_1', pageId: 'pg_42' });
    expect(name).toBe('ws_1/pg_42');
    expect(parseDocumentName(name)).toEqual({ workspaceId: 'ws_1', pageId: 'pg_42' });
  });

  it('形式に合わないものは null を返す', () => {
    expect(parseDocumentName('ws_1')).toBeNull();
    expect(parseDocumentName('ws_1/pg_42/extra')).toBeNull();
    expect(parseDocumentName('ws 1/pg_42')).toBeNull();
    expect(parseDocumentName('/pg_42')).toBeNull();
  });
});
