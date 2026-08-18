import { listSupplemental } from './supplemental-registry.mjs';

for (const project of listSupplemental()) {
  console.log(project.id);
}
