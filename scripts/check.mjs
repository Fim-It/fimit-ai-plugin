// scripts/check.mjs — run with `node scripts/check.mjs` (no dependencies).
//
// Guards the things a reviewer, a directory scan or a customer would catch:
//  - every SKILL.md has valid frontmatter within the platform limits;
//  - the shared measurement rules block is word-for-word identical in every skill;
//  - skills only mention tools the FimIt connector actually has;
//  - nothing that looks like a secret, an id or a personal address is published.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const TOOLS = new Set([
  'list_projects', 'list_scans', 'get_scan_summary',
  'get_scan_rooms', 'get_scan_materials', 'get_scan_exports',
]);
// Frontmatter keys claude.ai accepts on upload; anything else is a hard error there.
const ALLOWED_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const RULES = /<!-- fimit-rules:start -->([\s\S]*?)<!-- fimit-rules:end -->/;

const errors = [];
const fail = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

const skillsDir = join(ROOT, 'skills');
let rulesBlock = null;
for (const dir of readdirSync(skillsDir)) {
  const file = join(skillsDir, dir, 'SKILL.md');
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { fail(file, 'missing SKILL.md'); continue; }

  const fm = frontmatter(text);
  if (!fm) { fail(file, 'no frontmatter'); continue; }
  for (const k of Object.keys(fm)) if (!ALLOWED_KEYS.has(k)) fail(file, `frontmatter key "${k}" is not accepted by claude.ai`);
  if (fm.name !== dir) fail(file, `name "${fm.name}" must equal folder "${dir}"`);
  if (!/^[a-z0-9-]{1,64}$/.test(fm.name ?? '')) fail(file, 'name must be 1-64 lowercase letters, digits or hyphens');
  if (/claude|anthropic/.test(fm.name ?? '')) fail(file, 'name may not contain "claude" or "anthropic"');
  if (!fm.description || fm.description.length > 1024) fail(file, 'description missing or over 1024 characters');
  if (text.split('\n').length >= 500) fail(file, 'body should stay under 500 lines');

  const rules = text.match(RULES);
  if (!rules) fail(file, 'shared measurement rules block missing');
  else if (rulesBlock === null) rulesBlock = rules[1];
  else if (rules[1].replace(/\r/g, '') !== rulesBlock.replace(/\r/g, '')) fail(file, 'shared measurement rules block differs from the first skill');

  for (const [, tool] of text.matchAll(/`((?:list|get)_[a-z_]+)`/g)) {
    if (!TOOLS.has(tool)) fail(file, `mentions unknown tool "${tool}"`);
  }
}

// Publishing hygiene over every text file in the repo.
const SECRET_PATTERNS = [
  [/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/, 'looks like a JWT'],
  [/sk_(live|test)_[A-Za-z0-9]{8,}/, 'looks like a Stripe key'],
  [/(service_role|SUPABASE_[A-Z_]*KEY|client_secret)\s*[:=]/i, 'looks like a credential assignment'],
  [/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i, 'contains a UUID (a real project/scan/org id?)'],
  [/supabase\.co/i, 'mentions a Supabase project host'],
  [/[A-Za-z0-9._%+-]+@(?!fim-it\.com)[A-Za-z0-9.-]+\.[a-z]{2,}/, 'contains an e-mail address outside fim-it.com'],
];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === 'dist') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (p.endsWith('check.mjs')) continue; // the patterns themselves
    const text = readFileSync(p, 'utf8');
    for (const [re, why] of SECRET_PATTERNS) if (re.test(text)) fail(p, why);
  }
}
walk(ROOT);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log('✔ all skills and files pass');
