import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const skippedDirectories = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.nyc_output']);
const skippedExtensions = new Set([
  '.7z', '.avi', '.bmp', '.doc', '.docx', '.epub', '.gif', '.gz', '.ico', '.jpeg', '.jpg',
  '.mov', '.mp3', '.mp4', '.pdf', '.png', '.tar', '.webp', '.woff', '.woff2', '.zip'
]);

const patterns = [
  ['private key block', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36,255}\b/],
  ['GitHub fine-grained token', /\bgithub_pat_[A-Za-z0-9_]{80,255}\b/],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/]
];

const findings = [];
let scannedFiles = 0;

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (skippedDirectories.has(name)) continue;

    const absolute = join(directory, name);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      walk(absolute);
      continue;
    }

    if (!stat.isFile() || skippedExtensions.has(extname(name).toLowerCase())) continue;

    let text;
    try {
      text = readFileSync(absolute, 'utf8');
    } catch {
      continue;
    }

    scannedFiles += 1;
    const path = relative(root, absolute).replaceAll('\\', '/');

    for (const [kind, pattern] of patterns) {
      const match = pattern.exec(text);
      if (!match) continue;
      const line = text.slice(0, match.index).split('\n').length;
      findings.push({ path, line, kind });
    }
  }
}

walk(root);

if (findings.length) {
  console.error('Potential committed secrets detected:');
  for (const finding of findings) {
    console.error(`- ${finding.path}:${finding.line} (${finding.kind})`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  scannedFiles,
  detectedSecrets: 0,
  patterns: patterns.length
}, null, 2));
