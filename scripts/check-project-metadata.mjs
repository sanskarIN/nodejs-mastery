import { listProjects } from './project-registry.mjs';

const GUMROAD = 'https://ramsandesh.gumroad.com';
const REPO = 'https://github.com/sanskarIN/nodejs-mastery.git';
const errors = [];
const projects = listProjects();

for (const project of projects) {
  const pkg = project.package;
  if (!pkg) {
    errors.push(`${project.id}: missing package.json`);
    continue;
  }

  if (pkg.private !== true) errors.push(`${project.id}: package must remain private`);
  if (pkg.license !== 'MIT') errors.push(`${project.id}: license must be MIT`);
  if (!String(pkg.engines?.node ?? '').includes('>=20')) {
    errors.push(`${project.id}: engines.node must require Node.js 20+`);
  }
  for (const script of ['test', 'demo', 'verify']) {
    if (!pkg.scripts?.[script]) errors.push(`${project.id}: missing npm script '${script}'`);
  }
  if (pkg.homepage !== GUMROAD) errors.push(`${project.id}: homepage must point to Gumroad`);
  if (pkg.repository?.url !== REPO) errors.push(`${project.id}: repository URL is inconsistent`);
  if (pkg.repository?.directory !== `projects/${project.id}`) {
    errors.push(`${project.id}: repository.directory is inconsistent`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  projects: projects.length,
  node: '>=20',
  license: 'MIT',
  storefront: GUMROAD
}, null, 2));
