import { readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const skipped = new Set(['.git', 'node_modules', 'dist', 'coverage', '.nyc_output']);
const extensions = new Set(['.js', '.mjs', '.cjs']);
const files = [];
const failures = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skipped.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
}

walk(root);
files.sort();

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    failures.push({
      file: relative(root, file).replaceAll('\\', '/'),
      message: (result.stderr || result.stdout || 'syntax check failed').trim()
    });
  }
}

if (failures.length) {
  console.error('JavaScript syntax validation failed:');
  for (const failure of failures) console.error(`\n${failure.file}\n${failure.message}`);
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  javascriptFiles: files.length,
  syntaxErrors: 0,
  runtime: process.version
}, null, 2));
