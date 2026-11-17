#!/usr/bin/env node
// チケット（docs/tickets/T-*.md）の一覧、着手できるものの表示、整合性の確認。
//
//   node scripts/tickets.mjs list [--milestone M2] [--status todo]
//   node scripts/tickets.mjs next
//   node scripts/tickets.mjs check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DIR = fileURLToPath(new URL('../docs/tickets/', import.meta.url));
const STATUSES = ['todo', 'in-progress', 'done'];
const SIZES = ['S', 'M', 'L'];
const REQUIRED = ['id', 'title', 'status', 'milestone', 'size', 'depends_on'];

function parseFrontMatter(text, file) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) throw new Error(`${file}: 先頭にfrontmatterがありません`);
  const out = {};
  for (const line of match[1].split('\n')) {
    if (!line.trim()) continue;
    const at = line.indexOf(':');
    if (at < 0) throw new Error(`${file}: 読めない行です: ${line}`);
    const key = line.slice(0, at).trim();
    const raw = line.slice(at + 1).trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      out[key] = raw
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      out[key] = raw.replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

function load() {
  return readdirSync(DIR)
    .filter((name) => /^T-\d+.*\.md$/.test(name))
    .sort()
    .map((file) => ({ file, ...parseFrontMatter(readFileSync(`${DIR}${file}`, 'utf8'), file) }));
}

function line(t) {
  const deps = t.depends_on.length ? `  ← ${t.depends_on.join(', ')}` : '';
  const owner = t.owner ? `  @${t.owner}` : '';
  return `${t.id}  ${t.status.padEnd(11)}  ${t.milestone}  ${t.size}  ${t.title}${deps}${owner}`;
}

function option(args, name) {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
}

function list(args) {
  const milestone = option(args, '--milestone');
  const status = option(args, '--status');
  const tickets = load().filter(
    (t) => (!milestone || t.milestone === milestone) && (!status || t.status === status),
  );
  for (const t of tickets) console.log(line(t));
  const done = tickets.filter((t) => t.status === 'done').length;
  console.log(`\n${tickets.length}件（完了 ${done}件）`);
}

function next() {
  const tickets = load();
  const done = new Set(tickets.filter((t) => t.status === 'done').map((t) => t.id));
  const ready = tickets.filter(
    (t) => t.status === 'todo' && t.depends_on.every((id) => done.has(id)),
  );
  if (!ready.length) {
    console.log('着手できるチケットはありません。');
    return;
  }
  console.log('依存が片付いていて、着手できるチケット：\n');
  for (const t of ready) console.log(line(t));
  console.log('\nほかの人が着手していないかは、チームに確かめてください。');
}

function check() {
  const errors = [];
  let tickets = [];
  try {
    tickets = load();
  } catch (error) {
    errors.push(error.message);
  }
  const byId = new Map();
  for (const t of tickets) {
    for (const key of REQUIRED) {
      if (t[key] === undefined) errors.push(`${t.file}: ${key} がありません`);
    }
    if (!t.id) continue;
    if (!/^T-\d{3}$/.test(t.id)) errors.push(`${t.file}: id は T-000 の形にします`);
    if (!t.file.startsWith(`${t.id}-`)) errors.push(`${t.file}: ファイル名は ${t.id}- で始めます`);
    if (byId.has(t.id)) errors.push(`${t.file}: id が ${byId.get(t.id).file} と重なっています`);
    byId.set(t.id, t);
    if (!STATUSES.includes(t.status)) errors.push(`${t.file}: status は ${STATUSES.join(' / ')}`);
    if (!SIZES.includes(t.size)) errors.push(`${t.file}: size は ${SIZES.join(' / ')}`);
    if (!/^M\d+$/.test(t.milestone ?? '')) errors.push(`${t.file}: milestone は M0 の形にします`);
    if (!Array.isArray(t.depends_on))
      errors.push(`${t.file}: depends_on は [T-001, T-002] の形にします`);
    if (t.status === 'in-progress' && !t.owner)
      errors.push(`${t.file}: 着手中なら owner を書きます`);
  }
  for (const t of tickets) {
    for (const id of Array.isArray(t.depends_on) ? t.depends_on : []) {
      if (!byId.has(id)) errors.push(`${t.file}: 依存先 ${id} がありません`);
      else if (t.status === 'done' && byId.get(id).status !== 'done') {
        errors.push(`${t.file}: 完了していますが、依存先 ${id} が完了していません`);
      }
    }
  }
  // 依存の循環
  const state = new Map();
  const visit = (id, path) => {
    if (state.get(id) === 'done' || !byId.has(id)) return;
    if (state.get(id) === 'visiting') {
      errors.push(`依存が循環しています: ${[...path, id].join(' → ')}`);
      return;
    }
    state.set(id, 'visiting');
    const deps = byId.get(id).depends_on;
    for (const dep of Array.isArray(deps) ? deps : []) visit(dep, [...path, id]);
    state.set(id, 'done');
  };
  for (const id of byId.keys()) visit(id, []);

  if (errors.length) {
    for (const message of errors) console.error(`× ${message}`);
    process.exit(1);
  }
  console.log(`チケット ${tickets.length}件に問題はありません。`);
}

const [command = 'list', ...args] = process.argv.slice(2);
const commands = { list, next, check };
if (!commands[command]) {
  console.error('使い方: node scripts/tickets.mjs <list|next|check>');
  process.exit(1);
}
commands[command](args);
