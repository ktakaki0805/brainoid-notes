import { Server } from '@hocuspocus/server';
import { parseDocumentName } from './document-name';

export type SyncServerOptions = {
  port: number;
};

/**
 * 同期サーバー（Hocuspocus）。
 *
 * いまは文書名の形式だけを確かめる。接続時の権限確認と、Postgresへの保存は
 * まだない（T-025 で足す）。認証がないので、本番では起動しないようにしてある。
 */
export function createSyncServer({ port }: SyncServerOptions) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('同期サーバーの認証が未実装です（T-025）。本番では起動できません。');
  }

  return new Server({
    name: 'brainoid-sync',
    port,
    address: '127.0.0.1',
    async onConnect({ documentName }) {
      if (!parseDocumentName(documentName)) {
        throw new Error(`文書名の形式が違います: ${documentName}`);
      }
    },
  });
}
