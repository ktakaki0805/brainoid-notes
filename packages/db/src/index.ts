// Postgresへの接続とスキーマを置くパッケージ。apps/api と apps/sync から使う。
export { createDb, type Db } from './client';
export * as schema from './schema';
