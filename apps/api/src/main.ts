import { serve } from '@hono/node-server';
import { createApp } from './app';

const port = Number(process.env.API_PORT ?? 8787);

serve({ fetch: createApp().fetch, port }, (info) => {
  console.log(`api: http://localhost:${info.port}`);
});
