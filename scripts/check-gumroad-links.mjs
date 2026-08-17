import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { listProjects } from './project-registry.mjs';

const GUMROAD = 'https://ramsandesh.gumroad.com';
const requiredFiles = [
  'README.md',
  'BOOK_LICENSE.md',
  'CHANGELOG.md',
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'SUPPORT.md'
];

if (existsSync('docs')) {
  for (const entry of readdirSync('docs')) {
    if (entry.endsWith('.md')) requiredFiles.push(`docs/${entry}`);
  }
}

for (const project of listProjects()) {
  requiredFiles.push(`projects/${project.id}/README.md`);
}

const missing = [];
for (const file of requiredFiles) {
  if (!existsSync(file)) {
    missing.push(`${file} (missing file)`);
    continue;
  }
  const content = readFileSync(resolve(file), 'utf8');
  if (!content.includes(GUMROAD)) missing.push(file);
}

if (missing.length) {
  console.error(`Missing Gumroad storefront reference:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  checkedFiles: requiredFiles.length,
  storefront: GUMROAD
}, null, 2));
