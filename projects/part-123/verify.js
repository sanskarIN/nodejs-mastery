import fs from 'node:fs'; import crypto from 'node:crypto';
const files=['package.json','src/security.js','test/security.test.js','demo.js'];for(const f of files)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
console.log(JSON.stringify({ok:true,files:files.length,securitySha256:crypto.createHash('sha256').update(fs.readFileSync('src/security.js')).digest('hex')},null,2));
