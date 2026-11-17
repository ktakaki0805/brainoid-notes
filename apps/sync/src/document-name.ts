/**
 * 同期サーバーでの文書名。1ページが1つのYjsドキュメントになる。
 * 形式は `<workspaceId>/<pageId>`。docs/design/sync.md を参照。
 */
export type DocumentName = {
  workspaceId: string;
  pageId: string;
};

const ID = /^[A-Za-z0-9_-]+$/;

export function formatDocumentName({ workspaceId, pageId }: DocumentName): string {
  return `${workspaceId}/${pageId}`;
}

export function parseDocumentName(name: string): DocumentName | null {
  const parts = name.split('/');
  const [workspaceId, pageId] = parts;
  if (parts.length !== 2 || !workspaceId || !pageId) return null;
  if (!ID.test(workspaceId) || !ID.test(pageId)) return null;
  return { workspaceId, pageId };
}
