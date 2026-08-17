import { existsSync, readFileSync } from 'node:fs';

const required = [
  '.editorconfig',
  '.gitattributes',
  '.nvmrc',
  '.node-version',
  '.npmrc',
  '.github/CODEOWNERS',
  '.github/dependabot.yml',
  '.github/workflows/ci.yml',
  '.github/workflows/codeql.yml',
  '.github/workflows/dependency-review.yml',
  '.github/workflows/release-readiness.yml',
  'README.md',
  'LICENSE',
  'BOOK_LICENSE.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'SUPPORT.md',
  'CHANGELOG.md',
  'GOVERNANCE.md',
  'MAINTAINERS.md',
  'CITATION.cff',
  'docs/README.md',
  'docs/ARCHITECTURE.md',
  'docs/CI.md',
  'docs/COMMAND_REFERENCE.md',
  'docs/COMPANION_PROJECT_STANDARD.md',
  'docs/DEVELOPMENT.md',
  'docs/FAQ.md',
  'docs/GITHUB_SETTINGS.md',
  'docs/LEARNING_PATH.md',
  'docs/LICENSE_SCOPE.md',
  'docs/PROJECT_INDEX.md',
  'docs/PROJECT_STATUS.md',
  'docs/RECOVERY_POLICY.md',
  'docs/RELEASE_NOTES_v1.1.0.md',
  'docs/RELEASE_PROCESS.md',
  'docs/ROADMAP.md',
  'docs/RUNNING_PROJECTS.md',
  'docs/SECURITY_MODEL.md',
  'docs/STORE.md',
  'docs/TESTING.md',
  'docs/TROUBLESHOOTING.md',
  'assets/gumroad-storefront-badge.svg',
  'scripts/project-registry.mjs',
  'scripts/list-projects.mjs',
  'scripts/check-project-metadata.mjs',
  'scripts/check-project-readmes.mjs',
  'scripts/check-gumroad-links.mjs',
  'scripts/check-markdown-links.mjs',
  'scripts/check-project-isolation.mjs',
  'scripts/check-sensitive-files.mjs',
  'scripts/check-commercial-boundary.mjs'
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);
}

const gumroad = 'https://ramsandesh.gumroad.com';
const readme = readFileSync('README.md', 'utf8');
if (!readme.includes(gumroad)) throw new Error('README is missing Gumroad link');
if (!readme.includes('actions/workflows/ci.yml/badge.svg')) throw new Error('README is missing CI badge');
if (!readme.includes('actions/workflows/codeql.yml/badge.svg')) throw new Error('README is missing CodeQL badge');

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (pkg.version !== '1.1.0') throw new Error(`Unexpected repository version: ${pkg.version}`);
if (pkg.homepage !== gumroad) throw new Error('Root package homepage is not the Gumroad storefront');
if (pkg.license !== 'MIT') throw new Error('Root package license must be MIT');
if (!String(pkg.engines?.node ?? '').includes('>=20')) throw new Error('Root package must require Node.js 20+');

console.log(JSON.stringify({
  verified: true,
  requiredFiles: required.length,
  version: pkg.version,
  gumroadHighlighted: true,
  ciBadge: true,
  codeqlBadge: true,
  hostSettingsDocumented: true,
  releaseNotesPrepared: true,
  advancedPolicyChecks: true
}, null, 2));
