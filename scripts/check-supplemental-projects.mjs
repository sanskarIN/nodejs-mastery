import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { listSupplemental } from './supplemental-registry.mjs';

const GUMROAD = 'https://ramsandesh.gumroad.com';
const REPO = 'https://github.com/sanskarIN/nodejs-mastery.git';
const dependencyFields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const errors = [];
const projects = listSupplemental();

function filesUnder(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...filesUnder(path)); else out.push(path);
  }
  return out;
}

for (const project of projects) {
  const pkg = project.package;
  if (!pkg) { errors.push(`${project.id}: missing package.json`); continue; }
  if (pkg.private !== true) errors.push(`${project.id}: package must remain private from npm publication`);
  if (pkg.license !== 'MIT') errors.push(`${project.id}: license must be MIT`);
  if (pkg.engines?.node !== '>=22') errors.push(`${project.id}: engines.node must be exactly '>=22'`);
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
  const challengesPath = resolve(project.cwd, 'docs', 'challenges.md');
  if (!existsSync(readmePath)) errors.push(`${project.id}: missing README.md`);
  if (!existsSync(architecturePath)) errors.push(`${project.id}: missing docs/architecture.md`);
  if (!existsSync(challengesPath)) errors.push(`${project.id}: missing docs/challenges.md`);

  for (const path of [readmePath, architecturePath, challengesPath]) {
    if (!existsSync(path)) continue;
    const text = readFileSync(path, 'utf8');
    if (path === readmePath && !/supplemental/i.test(text)) errors.push(`${project.id}: README must identify the project as supplemental`);
    if (!text.includes(GUMROAD)) errors.push(`${project.id}: ${path.split('/').pop()} is missing the Gumroad storefront`);
    if (/https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\//i.test(text)) errors.push(`${project.id}: evergreen project docs must not contain X/Twitter profile URLs`);
  }

  if (existsSync(readmePath)) {
    const text = readFileSync(readmePath, 'utf8');
    for (const command of ['npm test', 'npm run demo', 'npm run verify']) if (!text.includes(command)) errors.push(`${project.id}: README is missing '${command}'`);
  }

  for (const path of filesUnder(project.cwd)) {
    if (imageExtensions.has(extname(path).toLowerCase())) errors.push(`${project.id}: supplemental labs must not contain person/avatar-capable image assets (${path})`);
  }
}

if (projects.length !== 12) errors.push(`expected exactly 12 supplemental projects for v2.0.0, found ${projects.length}`);

if (errors.length) {
  console.error('Supplemental project policy violations:');
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  supplementalProjects: projects.length,
  expectedForRelease: 12,
  node: '>=22',
  license: 'MIT',
  dependencies: 0,
  challengeDocs: projects.length,
  xTwitterEvergreenLinks: 0,
  supplementalImageAssets: 0,
  storefront: GUMROAD
}, null, 2));
