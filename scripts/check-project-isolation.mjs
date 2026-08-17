import { readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, resolve, relative } from 'node:path';
import { listProjects } from './project-registry.mjs';

const sourceExtensions = new Set(['.js', '.mjs', '.cjs']);
const violations = [];

function sourceFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(path));
    else if (sourceExtensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files;
}

const specifierPatterns = [
  /\bfrom\s+['"]([^'"]+)['"]/g,
  /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g
];

for (const project of listProjects()) {
  for (const file of sourceFiles(project.cwd)) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of specifierPatterns) {
      for (const match of text.matchAll(pattern)) {
        const specifier = match[1];
        if (!specifier.startsWith('.')) continue;
        const target = resolve(dirname(file), specifier);
        const rel = relative(project.cwd, target);
        if (rel.startsWith('..') || resolve(project.cwd, rel) !== target) {
          violations.push(`${project.id}: ${relative(project.cwd, file)} imports ${specifier}`);
        }
      }
    }
  }
}

if (violations.length) {
  console.error('Cross-part relative imports are not allowed:');
  console.error(violations.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  crossPartImports: 0,
  isolation: 'independent companion laboratories',
  storefront: 'https://ramsandesh.gumroad.com'
}, null, 2));
