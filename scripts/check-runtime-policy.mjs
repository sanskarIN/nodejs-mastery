import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { listProjects } from './project-registry.mjs';
import { listSupplemental } from './supplemental-registry.mjs';

const errors = [];
const requiredEngine = '>=22';

function packageJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function checkPackage(label, pkg) {
  if (pkg.engines?.node !== requiredEngine) {
    errors.push(`${label}: engines.node must be '${requiredEngine}', found '${pkg.engines?.node ?? 'missing'}'`);
  }
}

const rootPackage = packageJson('package.json');
checkPackage('root', rootPackage);
for (const project of listProjects()) checkPackage(project.id, project.package);
for (const project of listSupplemental()) checkPackage(`supplemental/${project.id}`, project.package);

for (const pin of ['.nvmrc', '.node-version']) {
  const value = readFileSync(pin, 'utf8').trim();
  if (value !== '24') errors.push(`${pin}: expected Node.js 24 LTS pin, found '${value}'`);
}

const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
if (!/node:\s*\[22,\s*24\]/.test(ci)) errors.push('Companion CI must test Node.js 22 and 24');
if (/node:\s*\[[^\]]*20/.test(ci)) errors.push('Companion CI must not test the EOL Node.js 20 line');

const release = readFileSync('.github/workflows/release-readiness.yml', 'utf8');
if (!/node-version:\s*24\b/.test(release)) errors.push('Release Readiness must use Node.js 24 LTS');

const historicalDocs = new Set(['RELEASE_NOTES_v1.1.0.md', 'RELEASE_NOTES_v1.2.0.md']);
const activeDocs = ['README.md', 'CONTRIBUTING.md', '.github/pull_request_template.md'];
for (const name of readdirSync('docs')) {
  if (name.endsWith('.md') && !historicalDocs.has(name)) activeDocs.push(join('docs', name));
}

const stalePatterns = [
  /Node\.js 20\+/,
  /Node\.js 20 or newer/,
  /Node\.js 20 compatibility/,
  /Node\.js 20 and Node\.js 22/,
  /Node\.js 20\/22/,
  /engines\.node[^\n]*>=20/
];

for (const path of activeDocs) {
  const text = readFileSync(path, 'utf8');
  for (const pattern of stalePatterns) {
    if (pattern.test(text)) errors.push(`${path}: contains stale supported-runtime wording (${pattern})`);
  }
}

if (errors.length) {
  console.error('Runtime policy violations:');
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  packageEngine: requiredEngine,
  requiredCiLines: [22, 24],
  localAndReleaseRuntime: 24,
  numberedProjects: listProjects().length,
  supplementalProjects: listSupplemental().length,
  activeDocumentationFilesChecked: activeDocs.length,
  staleRuntimeClaims: 0
}, null, 2));
