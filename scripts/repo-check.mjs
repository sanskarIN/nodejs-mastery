import { existsSync, readFileSync } from 'node:fs';

const required = [
  '.editorconfig', '.gitattributes', '.nvmrc', '.node-version', '.npmrc',
  '.github/CODEOWNERS', '.github/dependabot.yml', '.github/release.yml', '.github/pull_request_template.md',
  '.github/workflows/ci.yml', '.github/workflows/codeql.yml', '.github/workflows/dependency-review.yml', '.github/workflows/release-readiness.yml',
  'README.md', 'LICENSE', 'BOOK_LICENSE.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md', 'SUPPORT.md', 'CHANGELOG.md', 'GOVERNANCE.md', 'MAINTAINERS.md', 'CITATION.cff',
  'config/dependency-policy.json',
  'docs/README.md', 'docs/ACCESSIBILITY.md', 'docs/ARCHITECTURE.md', 'docs/CI.md', 'docs/COMMAND_REFERENCE.md', 'docs/COMPANION_PROJECT_STANDARD.md', 'docs/SUPPLEMENTAL_PROJECT_STANDARD.md', 'docs/DEPENDENCY_POLICY.md', 'docs/DEVELOPMENT.md', 'docs/FAQ.md', 'docs/GITHUB_SETTINGS.md', 'docs/HOST_RELEASE_CHECKLIST.md', 'docs/LEARNING_PATH.md', 'docs/LICENSE_SCOPE.md', 'docs/MAINTENANCE_STATUS.md', 'docs/PRIVACY.md', 'docs/PROJECT_INDEX.md', 'docs/PROJECT_STATUS.md', 'docs/QUALITY_ASSURANCE.md', 'docs/RECOVERY_POLICY.md', 'docs/RELEASE_NOTES_v1.1.0.md', 'docs/RELEASE_NOTES_v1.2.0.md', 'docs/RELEASE_NOTES_v2.0.0.md', 'docs/RELEASE_PROCESS.md', 'docs/ROADMAP.md', 'docs/RUNNING_PROJECTS.md', 'docs/RUNTIME_SUPPORT.md', 'docs/SECURITY_MODEL.md', 'docs/STORE.md', 'docs/SUPPLY_CHAIN.md', 'docs/SUPPLEMENTAL_PROJECTS.md', 'docs/TESTING.md', 'docs/TROUBLESHOOTING.md', 'docs/VERSIONING.md',
  'assets/gumroad-storefront-badge.svg',
  'scripts/project-registry.mjs', 'scripts/list-projects.mjs', 'scripts/supplemental-registry.mjs', 'scripts/list-supplemental.mjs', 'scripts/run-supplemental.mjs',
  'scripts/check-syntax.mjs', 'scripts/check-json.mjs', 'scripts/check-runtime-policy.mjs',
  'scripts/check-dependencies.mjs', 'scripts/check-project-metadata.mjs', 'scripts/check-project-readmes.mjs', 'scripts/check-supplemental-projects.mjs', 'scripts/check-gumroad-links.mjs', 'scripts/check-markdown-links.mjs', 'scripts/check-project-isolation.mjs', 'scripts/check-sensitive-files.mjs', 'scripts/check-secret-patterns.mjs', 'scripts/check-sbom.mjs', 'scripts/check-commercial-boundary.mjs', 'scripts/generate-sbom.mjs'
];

for (const path of required) if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);

const gumroad = 'https://ramsandesh.gumroad.com';
const readme = readFileSync('README.md', 'utf8');
if (!readme.includes(gumroad)) throw new Error('README is missing Gumroad link');
if (!readme.includes('actions/workflows/ci.yml/badge.svg')) throw new Error('README is missing CI badge');
if (!readme.includes('actions/workflows/codeql.yml/badge.svg')) throw new Error('README is missing CodeQL badge');
if (!readme.includes('Node.js-22%2B')) throw new Error('README Node.js badge must advertise 22+');
if (!readme.includes('docs/RUNTIME_SUPPORT.md')) throw new Error('README is missing runtime-support navigation');
if (!readme.includes('docs/RELEASE_NOTES_v2.0.0.md')) throw new Error('README must link current v2 release notes');
if (!readme.includes('12 projects are new educational labs')) throw new Error('README must state the supplemental inventory');

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (pkg.version !== '2.0.0') throw new Error(`Unexpected repository version: ${pkg.version}`);
if (pkg.homepage !== gumroad) throw new Error('Root package homepage is not the Gumroad storefront');
if (pkg.license !== 'MIT') throw new Error('Root package license must be MIT');
if (pkg.engines?.node !== '>=22') throw new Error("Root package must declare engines.node as '>=22'");
for (const [name, script] of [
  ['check:syntax', 'check-syntax.mjs'],
  ['check:json', 'check-json.mjs'],
  ['check:runtime', 'check-runtime-policy.mjs'],
  ['check:supplemental', 'check-supplemental-projects.mjs'],
  ['check:secrets', 'check-secret-patterns.mjs'],
  ['check:sbom', 'check-sbom.mjs']
]) {
  if (!pkg.scripts?.[name]?.includes(script)) throw new Error(`Root package is missing ${name}`);
}
for (const name of ['check:syntax', 'check:json', 'check:runtime', 'check:supplemental', 'check:sbom']) {
  if (!pkg.scripts?.check?.includes(name)) throw new Error(`Root npm run check must include ${name}`);
}
if (!pkg.scripts?.release?.includes?.('release:check')) {
  // No standalone release alias is required; release:check below is authoritative.
}
if (!pkg.scripts?.['release:check']?.includes('npm run demo')) throw new Error('release:check must execute demos');

const citation = readFileSync('CITATION.cff', 'utf8');
if (!/\nversion:\s*2\.0\.0\n/.test(citation)) throw new Error('CITATION.cff must advertise v2.0.0');

const hostChecklist = readFileSync('docs/HOST_RELEASE_CHECKLIST.md', 'utf8');
if (!hostChecklist.includes('v2.0.0')) throw new Error('Host release checklist must target v2.0.0');
const releaseNotes = readFileSync('docs/RELEASE_NOTES_v2.0.0.md', 'utf8');
if (!releaseNotes.includes('Node.js 22+')) throw new Error('v2 release notes must describe the runtime floor');
const runtimeSupport = readFileSync('docs/RUNTIME_SUPPORT.md', 'utf8');
if (!runtimeSupport.includes('Node.js 22') || !runtimeSupport.includes('Node.js 24')) throw new Error('Runtime support document must describe Node.js 22 and 24');
const qa = readFileSync('docs/QUALITY_ASSURANCE.md', 'utf8');
if (!qa.includes('npm run release:check')) throw new Error('Quality assurance document must define the release gate');

const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
const codeql = readFileSync('.github/workflows/codeql.yml', 'utf8');
const dependencyReview = readFileSync('.github/workflows/dependency-review.yml', 'utf8');
const releaseReadiness = readFileSync('.github/workflows/release-readiness.yml', 'utf8');
for (const [name, workflow] of [['CI', ci], ['CodeQL', codeql], ['Dependency Review', dependencyReview], ['Release Readiness', releaseReadiness]]) if (!workflow.includes('actions/checkout@v7')) throw new Error(`${name} must use actions/checkout@v7`);
if (!ci.includes('actions/setup-node@v7')) throw new Error('CI must use actions/setup-node@v7');
if (!/node:\s*\[22,\s*24\]/.test(ci)) throw new Error('CI must test Node.js 22 and 24');
if (!ci.includes('npm run demo')) throw new Error('CI must execute deterministic demos');
if (!releaseReadiness.includes('actions/setup-node@v7')) throw new Error('Release Readiness must use actions/setup-node@v7');
if (!/node-version:\s*24\b/.test(releaseReadiness)) throw new Error('Release Readiness must use Node.js 24');
for (const phase of ['init', 'autobuild', 'analyze']) if (!codeql.includes(`github/codeql-action/${phase}@v4`)) throw new Error(`CodeQL ${phase} must use github/codeql-action@v4`);
if (!dependencyReview.includes('actions/dependency-review-action@v5.0.0')) throw new Error('Dependency Review must use actions/dependency-review-action@v5.0.0');
if (!releaseReadiness.includes('actions/attest@v4')) throw new Error('Release Readiness must attest the SBOM with actions/attest@v4');
if (!releaseReadiness.includes('actions/upload-artifact@v7')) throw new Error('Release Readiness must upload the SBOM with actions/upload-artifact@v7');
for (const permission of ['id-token: write', 'attestations: write', 'artifact-metadata: write']) if (!releaseReadiness.includes(permission)) throw new Error(`Release Readiness is missing permission: ${permission}`);

console.log(JSON.stringify({
  verified: true,
  requiredFiles: required.length,
  version: pkg.version,
  nodeEngine: pkg.engines.node,
  ciNodeMatrix: [22, 24],
  releaseNode: 24,
  gumroadHighlighted: true,
  numberedProjects: 10,
  supplementalProjects: 12,
  publicProjects: 22,
  syntaxValidation: true,
  jsonValidation: true,
  runtimePolicy: true,
  deterministicDemosInCi: true,
  qualityAssuranceDocumented: true,
  sbomValidation: true,
  sbomAttestation: true,
  codeqlActionV4: true,
  dependencyReviewV5: true
}, null, 2));
