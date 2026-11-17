import { Hono } from 'hono';

/**
 * APIサーバーの本体。ルートはここに足していく。
 * テストでは listen せずに app.request() で呼ぶ。
 */
export function createApp() {
  const app = new Hono();

  app.get('/health', (c) => c.json({ status: 'ok' }));

  return app;
}
