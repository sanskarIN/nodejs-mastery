import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const skipped = new Set(['.git', 'node_modules', 'dist', 'coverage', '.nyc_output']);
const files = [];
const failures = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skipped.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile() && extname(entry.name).toLowerCase() === '.json') files.push(path);
  }
}

walk(root);
files.sort();

for (const file of files) {
  try {
    JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push({ file: relative(root, file).replaceAll('\\', '/'), message: error.message });
  }
}

if (failures.length) {
  console.error('JSON validation failed:');
  for (const failure of failures) console.error(`- ${failure.file}: ${failure.message}`);
  process.exit(1);
}

console.log(JSON.stringify({ verified: true, jsonFiles: files.length, parseErrors: 0 }, null, 2));
