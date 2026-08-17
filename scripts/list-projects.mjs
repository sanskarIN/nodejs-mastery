import { listProjects } from './project-registry.mjs';

const projects = listProjects();

console.log('Available Node.js Full Mastery companion projects:\n');
for (const project of projects) {
  const description = project.package?.description ?? 'No description';
  console.log(`${String(project.part).padStart(3, '0')}  ${project.id}  ${description}`);
}

console.log(`\nTotal available projects: ${projects.length}`);
console.log('Complete 125-part eBook: https://ramsandesh.gumroad.com');
