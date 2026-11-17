import { createSyncServer } from './server';

const port = Number(process.env.SYNC_PORT ?? 8788);

await createSyncServer({ port }).listen();
