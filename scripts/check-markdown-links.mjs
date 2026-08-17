import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

const ignoredDirectories = new Set(['.git', 'node_modules']);
const markdownFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (extname(entry.name).toLowerCase() === '.md') markdownFiles.push(path);
  }
}

walk('.');

const broken = [];
const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (!target || target.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(target)) continue;

    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    target = target.split('#')[0].split('?')[0].trim();
    if (!target) continue;

    const candidate = resolve(dirname(file), decodeURIComponent(target));
    if (!existsSync(candidate)) {
      broken.push(`${file}: ${match[1]}`);
    }
  }
}

if (broken.length) {
  console.error('Broken relative Markdown links:');
  console.error(broken.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  markdownFiles: markdownFiles.length,
  brokenRelativeLinks: 0,
  storefront: 'https://ramsandesh.gumroad.com'
}, null, 2));
