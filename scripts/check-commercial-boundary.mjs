import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const forbiddenExtensions = new Set(['.pdf', '.docx', '.epub']);
const forbiddenNamePatterns = [
  /complete[_-]?ebook/i,
  /publication[_-]?package/i,
  /master[_-]?manuscript/i,
  /paid[_-]?edition/i
];
const ignoredDirectories = new Set(['.git', 'node_modules']);
const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(path);
      continue;
    }

    const lower = entry.name.toLowerCase();
    const extension = lower.includes('.') ? lower.slice(lower.lastIndexOf('.')) : '';
    if (forbiddenExtensions.has(extension)) violations.push(path);
    if (forbiddenNamePatterns.some((pattern) => pattern.test(entry.name))) violations.push(path);
  }
}

walk('.');

const unique = [...new Set(violations)];
if (unique.length) {
  console.error('Commercial-book artifacts must not be committed to the public code repository:');
  console.error(unique.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  publicRepository: 'code-and-docs-only',
  commercialBook: 'excluded',
  storefront: 'https://ramsandesh.gumroad.com'
}, null, 2));
