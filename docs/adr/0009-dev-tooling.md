# ADR-0009: 開発の道具はVite、Hono、Drizzle、Vitest、Biome

- 状態：採用
- 日付：2026-11-13

## 状況

仕様で決まっているのは、TypeScript、React、Lexical、Hocuspocus、Postgresまで。残りの道具を決める必要がある。

## 決定

WebはViteとReact、APIはHono、DBはDrizzle、テストはVitest、整形とlintはBiome、パッケージ管理はpnpmにする。

## 理由

- Webはログイン後の画面だけで、サーバーでの描画が要らない
- Honoは軽く、サーバーを立てずにテストできる
- DrizzleはSQLに近く、再帰クエリやPGroongaを素直に書ける
- BiomeとVitestは設定が少ない

## 影響

- サーバーは開発時にtsxで動かす。本番用のビルドはT-075で足す
- 道具を替えるときは、このADRを置き換えるADRを書く
