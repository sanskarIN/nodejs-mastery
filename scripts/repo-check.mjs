import { existsSync, readFileSync } from 'node:fs';

const required = [
  'README.md','LICENSE','BOOK_LICENSE.md','CONTRIBUTING.md','CODE_OF_CONDUCT.md',
  'SECURITY.md','SUPPORT.md','CHANGELOG.md','docs/LICENSE_SCOPE.md',
  'docs/PROJECT_STATUS.md','assets/gumroad-storefront-badge.svg'
];
for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);
}
const readme = readFileSync('README.md', 'utf8');
if (!readme.includes('https://ramsandesh.gumroad.com')) throw new Error('README is missing Gumroad link');
console.log(JSON.stringify({ verified: true, requiredFiles: required.length, gumroadHighlighted: true }, null, 2));
