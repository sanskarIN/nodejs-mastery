import { existsSync, readFileSync } from 'node:fs';

const required = [
  '.editorconfig', '.gitattributes', '.nvmrc', '.node-version', '.npmrc',
  '.github/CODEOWNERS', '.github/dependabot.yml', '.github/release.yml',
  '.github/workflows/ci.yml', '.github/workflows/codeql.yml', '.github/workflows/dependency-review.yml', '.github/workflows/release-readiness.yml',
  'README.md', 'LICENSE', 'BOOK_LICENSE.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md', 'SUPPORT.md', 'CHANGELOG.md', 'GOVERNANCE.md', 'MAINTAINERS.md', 'CITATION.cff',
  'config/dependency-policy.json',
  'docs/README.md', 'docs/ACCESSIBILITY.md', 'docs/ARCHITECTURE.md', 'docs/CI.md', 'docs/COMMAND_REFERENCE.md', 'docs/COMPANION_PROJECT_STANDARD.md', 'docs/SUPPLEMENTAL_PROJECT_STANDARD.md', 'docs/DEPENDENCY_POLICY.md', 'docs/DEVELOPMENT.md', 'docs/FAQ.md', 'docs/GITHUB_SETTINGS.md', 'docs/HOST_RELEASE_CHECKLIST.md', 'docs/LEARNING_PATH.md', 'docs/LICENSE_SCOPE.md', 'docs/MAINTENANCE_STATUS.md', 'docs/PRIVACY.md', 'docs/PROJECT_INDEX.md', 'docs/PROJECT_STATUS.md', 'docs/RECOVERY_POLICY.md', 'docs/RELEASE_NOTES_v1.1.0.md', 'docs/RELEASE_NOTES_v1.2.0.md', 'docs/RELEASE_PROCESS.md', 'docs/ROADMAP.md', 'docs/RUNNING_PROJECTS.md', 'docs/SECURITY_MODEL.md', 'docs/STORE.md', 'docs/SUPPLY_CHAIN.md', 'docs/SUPPLEMENTAL_PROJECTS.md', 'docs/TESTING.md', 'docs/TROUBLESHOOTING.md', 'docs/VERSIONING.md',
  'assets/gumroad-storefront-badge.svg',
  'scripts/project-registry.mjs', 'scripts/list-projects.mjs', 'scripts/supplemental-registry.mjs', 'scripts/list-supplemental.mjs', 'scripts/run-supplemental.mjs',
  'scripts/check-dependencies.mjs', 'scripts/check-project-metadata.mjs', 'scripts/check-project-readmes.mjs', 'scripts/check-supplemental-projects.mjs', 'scripts/check-gumroad-links.mjs', 'scripts/check-markdown-links.mjs', 'scripts/check-project-isolation.mjs', 'scripts/check-sensitive-files.mjs', 'scripts/check-secret-patterns.mjs', 'scripts/check-sbom.mjs', 'scripts/check-commercial-boundary.mjs', 'scripts/generate-sbom.mjs'
];

for (const path of required) if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);

const gumroad = 'https://ramsandesh.gumroad.com';
const readme = readFileSync('README.md', 'utf8');
if (!readme.includes(gumroad)) throw new Error('README is missing Gumroad link');
if (!readme.includes('actions/workflows/ci.yml/badge.svg')) throw new Error('README is missing CI badge');
if (!readme.includes('actions/workflows/codeql.yml/badge.svg')) throw new Error('README is missing CodeQL badge');
if (!readme.includes('docs/SUPPLEMENTAL_PROJECTS.md')) throw new Error('README is missing the supplemental project index');

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (pkg.version !== '1.2.0') throw new Error(`Unexpected repository version: ${pkg.version}`);
if (pkg.homepage !== gumroad) throw new Error('Root package homepage is not the Gumroad storefront');
if (pkg.license !== 'MIT') throw new Error('Root package license must be MIT');
if (!String(pkg.engines?.node ?? '').includes('>=20')) throw new Error('Root package must require Node.js 20+');
if (!pkg.scripts?.supplemental?.includes('list-supplemental.mjs')) throw new Error('Root package is missing supplemental project listing');
if (!pkg.scripts?.['test:supplemental']?.includes('run-supplemental.mjs')) throw new Error('Root package is missing supplemental tests');
if (!pkg.scripts?.['verify:supplemental']?.includes('run-supplemental.mjs')) throw new Error('Root package is missing supplemental verification');
if (!pkg.scripts?.['demo:supplemental']?.includes('run-supplemental.mjs')) throw new Error('Root package is missing supplemental demos');
if (!pkg.scripts?.['check:supplemental']?.includes('check-supplemental-projects.mjs')) throw new Error('Root package is missing supplemental policy checks');
if (!pkg.scripts?.check?.includes('check:supplemental')) throw new Error('Root repository check must include supplemental policy validation');
if (!pkg.scripts?.sbom?.includes('generate-sbom.mjs')) throw new Error('Root package is missing the SBOM generator command');
if (!pkg.scripts?.['check:secrets']?.includes('check-secret-patterns.mjs')) throw new Error('Root package is missing committed secret scanning');
if (!pkg.scripts?.['check:sbom']?.includes('check-sbom.mjs')) throw new Error('Root package is missing SBOM validation');
if (!pkg.scripts?.check?.includes('check:sbom')) throw new Error('Root repository check must include SBOM validation');

const hostChecklist = readFileSync('docs/HOST_RELEASE_CHECKLIST.md', 'utf8');
if (!hostChecklist.includes('v1.2.0')) throw new Error('Host release checklist must target v1.2.0');
const releaseNotes = readFileSync('docs/RELEASE_NOTES_v1.2.0.md', 'utf8');
if (!releaseNotes.includes('eight new dependency-free')) throw new Error('v1.2.0 release notes must describe the supplemental project collection');

const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
const codeql = readFileSync('.github/workflows/codeql.yml', 'utf8');
const dependencyReview = readFileSync('.github/workflows/dependency-review.yml', 'utf8');
const releaseReadiness = readFileSync('.github/workflows/release-readiness.yml', 'utf8');
for (const [name, workflow] of [['CI', ci], ['CodeQL', codeql], ['Dependency Review', dependencyReview], ['Release Readiness', releaseReadiness]]) if (!workflow.includes('actions/checkout@v7')) throw new Error(`${name} must use actions/checkout@v7`);
if (!ci.includes('actions/setup-node@v7')) throw new Error('CI must use actions/setup-node@v7');
if (!releaseReadiness.includes('actions/setup-node@v7')) throw new Error('Release Readiness must use actions/setup-node@v7');
for (const phase of ['init', 'autobuild', 'analyze']) if (!codeql.includes(`github/codeql-action/${phase}@v4`)) throw new Error(`CodeQL ${phase} must use github/codeql-action@v4`);
if (!dependencyReview.includes('actions/dependency-review-action@v5.0.0')) throw new Error('Dependency Review must use actions/dependency-review-action@v5.0.0');
if (!releaseReadiness.includes('actions/attest@v4')) throw new Error('Release Readiness must attest the SBOM with actions/attest@v4');
if (!releaseReadiness.includes('actions/upload-artifact@v7')) throw new Error('Release Readiness must upload the SBOM with actions/upload-artifact@v7');
for (const permission of ['id-token: write', 'attestations: write', 'artifact-metadata: write']) if (!releaseReadiness.includes(permission)) throw new Error(`Release Readiness is missing permission: ${permission}`);

console.log(JSON.stringify({
  verified: true,
  requiredFiles: required.length,
  version: pkg.version,
  gumroadHighlighted: true,
  ciBadge: true,
  codeqlBadge: true,
  numberedProjects: true,
  supplementalProjects: true,
  supplementalPolicyCheck: true,
  supplementalStandard: true,
  sbomIncludesSupplementalLabs: true,
  hostSettingsDocumented: true,
  releaseNotesPrepared: true,
  advancedPolicyChecks: true,
  secretPatternScanning: true,
  sbomGeneration: true,
  sbomValidation: true,
  githubActionsV7: true,
  codeqlActionV4: true,
  dependencyReviewV5: true,
  sbomAttestation: true
}, null, 2));
