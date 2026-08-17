import { readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ignoredDirectories = new Set(['.git', 'node_modules']);
const sensitiveExtensions = new Set(['.pem', '.p12', '.pfx', '.key', '.jks', '.keystore']);
const sensitiveNames = new Set([
  '.env',
  'id_rsa',
  'id_ed25519',
  'credentials.json',
  'service-account.json',
  'service_account.json'
]);
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
    if (sensitiveNames.has(lower) || sensitiveExtensions.has(extname(lower))) {
      violations.push(path);
    }
    if (/^service[-_]?account.*\.json$/i.test(entry.name)) violations.push(path);
  }
}

walk('.');

const unique = [...new Set(violations)];
if (unique.length) {
  console.error('Credential-like or sensitive files are not allowed in the public repository:');
  console.error(unique.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  credentialLikeFiles: 0,
  publicRepository: 'safe-file-name baseline',
  storefront: 'https://ramsandesh.gumroad.com'
}, null, 2));
