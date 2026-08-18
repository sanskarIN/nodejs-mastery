import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { listSupplemental } from './supplemental-registry.mjs';

const GUMROAD = 'https://ramsandesh.gumroad.com';
const REPO = 'https://github.com/sanskarIN/nodejs-mastery.git';
const dependencyFields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const errors = [];
const projects = listSupplemental();

for (const project of projects) {
  const pkg = project.package;
  if (!pkg) { errors.push(`${project.id}: missing package.json`); continue; }
  if (pkg.private !== true) errors.push(`${project.id}: package must remain private from npm publication`);
  if (pkg.license !== 'MIT') errors.push(`${project.id}: license must be MIT`);
  if (!String(pkg.engines?.node ?? '').includes('>=20')) errors.push(`${project.id}: engines.node must require Node.js 20+`);
  for (const script of ['test', 'demo', 'verify']) if (!pkg.scripts?.[script]) errors.push(`${project.id}: missing npm script '${script}'`);
  if (pkg.homepage !== GUMROAD) errors.push(`${project.id}: homepage must point to Gumroad`);
  if (pkg.repository?.url !== REPO) errors.push(`${project.id}: repository URL is inconsistent`);
  if (pkg.repository?.directory !== `supplemental/${project.id}`) errors.push(`${project.id}: repository.directory is inconsistent`);
  for (const field of dependencyFields) {
    const names = Object.keys(pkg[field] ?? {});
    if (names.length) errors.push(`${project.id}: supplemental labs must remain dependency-free (${field}: ${names.join(', ')})`);
  }

  const readmePath = resolve(project.cwd, 'README.md');
  const architecturePath = resolve(project.cwd, 'docs', 'architecture.md');
  if (!existsSync(readmePath)) errors.push(`${project.id}: missing README.md`);
  if (!existsSync(architecturePath)) errors.push(`${project.id}: missing docs/architecture.md`);
  if (existsSync(readmePath)) {
    const text = readFileSync(readmePath, 'utf8');
    if (!/supplemental/i.test(text)) errors.push(`${project.id}: README must identify the project as supplemental`);
    if (!text.includes(GUMROAD)) errors.push(`${project.id}: README is missing the Gumroad storefront`);
    for (const command of ['npm test', 'npm run demo', 'npm run verify']) if (!text.includes(command)) errors.push(`${project.id}: README is missing '${command}'`);
    if (/https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\//i.test(text)) errors.push(`${project.id}: evergreen README must not contain X/Twitter profile URLs`);
  }
}

if (projects.length < 8) errors.push(`expected at least 8 supplemental projects, found ${projects.length}`);

if (errors.length) {
  console.error('Supplemental project policy violations:');
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  supplementalProjects: projects.length,
  node: '>=20',
  license: 'MIT',
  dependencies: 0,
  xTwitterEvergreenLinks: 0,
  storefront: GUMROAD
}, null, 2));
