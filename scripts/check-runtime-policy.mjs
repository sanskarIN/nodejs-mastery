import { readFileSync } from 'node:fs';
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
  supplementalProjects: listSupplemental().length
}, null, 2));
