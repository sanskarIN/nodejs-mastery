import { existsSync, readFileSync } from 'node:fs';

const required = [
  '.editorconfig',
  '.gitattributes',
  '.nvmrc',
  '.node-version',
  '.npmrc',
  '.github/CODEOWNERS',
  '.github/dependabot.yml',
  '.github/release.yml',
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
  'config/dependency-policy.json',
  'docs/README.md',
  'docs/ACCESSIBILITY.md',
  'docs/ARCHITECTURE.md',
  'docs/CI.md',
  'docs/COMMAND_REFERENCE.md',
  'docs/COMPANION_PROJECT_STANDARD.md',
  'docs/DEPENDENCY_POLICY.md',
  'docs/DEVELOPMENT.md',
  'docs/FAQ.md',
  'docs/GITHUB_SETTINGS.md',
  'docs/LEARNING_PATH.md',
  'docs/LICENSE_SCOPE.md',
  'docs/PRIVACY.md',
  'docs/PROJECT_INDEX.md',
  'docs/PROJECT_STATUS.md',
  'docs/RECOVERY_POLICY.md',
  'docs/RELEASE_NOTES_v1.1.0.md',
  'docs/RELEASE_PROCESS.md',
  'docs/ROADMAP.md',
  'docs/RUNNING_PROJECTS.md',
  'docs/SECURITY_MODEL.md',
  'docs/STORE.md',
  'docs/SUPPLY_CHAIN.md',
  'docs/TESTING.md',
  'docs/TROUBLESHOOTING.md',
  'docs/VERSIONING.md',
  'assets/gumroad-storefront-badge.svg',
  'scripts/project-registry.mjs',
  'scripts/list-projects.mjs',
  'scripts/check-dependencies.mjs',
  'scripts/check-project-metadata.mjs',
  'scripts/check-project-readmes.mjs',
  'scripts/check-gumroad-links.mjs',
  'scripts/check-markdown-links.mjs',
  'scripts/check-project-isolation.mjs',
  'scripts/check-sensitive-files.mjs',
  'scripts/check-secret-patterns.mjs',
  'scripts/check-sbom.mjs',
  'scripts/check-commercial-boundary.mjs',
  'scripts/generate-sbom.mjs'
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
if (!pkg.scripts?.sbom?.includes('generate-sbom.mjs')) throw new Error('Root package is missing the SBOM generator command');
if (!pkg.scripts?.['check:secrets']?.includes('check-secret-patterns.mjs')) throw new Error('Root package is missing committed secret scanning');
if (!pkg.scripts?.['check:sbom']?.includes('check-sbom.mjs')) throw new Error('Root package is missing SBOM validation');
if (!pkg.scripts?.check?.includes('check:sbom')) throw new Error('Root repository check must include SBOM validation');

const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
const codeql = readFileSync('.github/workflows/codeql.yml', 'utf8');
const dependencyReview = readFileSync('.github/workflows/dependency-review.yml', 'utf8');
const releaseReadiness = readFileSync('.github/workflows/release-readiness.yml', 'utf8');

for (const [name, workflow] of [
  ['CI', ci],
  ['CodeQL', codeql],
  ['Dependency Review', dependencyReview],
  ['Release Readiness', releaseReadiness]
]) {
  if (!workflow.includes('actions/checkout@v7')) throw new Error(`${name} must use actions/checkout@v7`);
}
if (!ci.includes('actions/setup-node@v7')) throw new Error('CI must use actions/setup-node@v7');
if (!releaseReadiness.includes('actions/setup-node@v7')) throw new Error('Release Readiness must use actions/setup-node@v7');
if (!releaseReadiness.includes('actions/upload-artifact@v7')) throw new Error('Release Readiness must upload the SBOM with actions/upload-artifact@v7');

console.log(JSON.stringify({
  verified: true,
  requiredFiles: required.length,
  version: pkg.version,
  gumroadHighlighted: true,
  ciBadge: true,
  codeqlBadge: true,
  hostSettingsDocumented: true,
  releaseNotesPrepared: true,
  advancedPolicyChecks: true,
  dependencyPolicy: true,
  privacyPolicy: true,
  accessibilityPolicy: true,
  versioningPolicy: true,
  secretPatternScanning: true,
  sbomGeneration: true,
  sbomValidation: true,
  githubActionsV7: true
}, null, 2));
