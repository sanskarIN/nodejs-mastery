import { spawnSync } from 'node:child_process';
import { listSupplemental } from './supplemental-registry.mjs';
const command=process.argv[2]??'test'; const projects=listSupplemental(); let failed=0;
if(!projects.length){console.error('No supplemental projects found.'); process.exit(1);}
for(const project of projects){ if(!project.package?.scripts?.[command]){console.log(`[${project.id}] skip ${command}`); continue;} console.log(`\n=== supplemental/${project.id}: npm run ${command} ===`); const r=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run',command],{cwd:project.cwd,stdio:'inherit'}); if(r.status!==0) failed++; }
if(failed){console.error(`${failed} supplemental project(s) failed '${command}'.`); process.exit(1);} console.log(`\nAll ${projects.length} supplemental projects passed '${command}'.`);
