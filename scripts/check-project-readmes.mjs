import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { listProjects } from './project-registry.mjs';

const GUMROAD = 'https://ramsandesh.gumroad.com';
const errors = [];
const projects = listProjects();

for (const project of projects) {
  const readmePath = resolve(project.cwd, 'README.md');
  if (!existsSync(readmePath)) {
    errors.push(`${project.id}: missing README.md`);
    continue;
  }

  const text = readFileSync(readmePath, 'utf8');
  const partPattern = new RegExp(`part[\\s-_]*0*${project.part}\\b`, 'i');
  if (!partPattern.test(text)) errors.push(`${project.id}: README does not identify its part number`);
  if (!text.includes(GUMROAD)) errors.push(`${project.id}: README is missing the Gumroad storefront`);

  for (const command of ['npm test', 'npm run demo', 'npm run verify']) {
    if (!text.includes(command)) errors.push(`${project.id}: README is missing '${command}'`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  projects: projects.length,
  runnableReadmes: projects.length,
  storefront: GUMROAD
}, null, 2));
