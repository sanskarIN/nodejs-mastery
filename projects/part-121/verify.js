'use strict';
const fs=require('node:fs'); const path=require('node:path');
const {VersionedStore}=require('./lib/versioned-store'); const {BackupManager}=require('./lib/backup'); const {AuditChain}=require('./lib/audit-chain'); const {ReleaseGate}=require('./lib/release-gate');
const required=['README.md','package.json','demo.js','verify.js','lib/pool.js','lib/versioned-store.js','lib/lock-manager.js','lib/replica.js','lib/shard-router.js','lib/cache.js','lib/unique-reservation.js','lib/outbox.js','lib/backup.js','lib/region-owner.js','lib/audit-chain.js','lib/release-gate.js','test/storage.test.js'];
const gate=new ReleaseGate(); for(const f of required) gate.add(`file:${f}`,fs.existsSync(path.join(__dirname,f)),f);
const s=new VersionedStore(); s.seed('verify',{ok:true}); const bm=new BackupManager(); const b=bm.create(s); gate.add('backup-integrity',bm.verify(b),'checksummed restore source');
const audit=new AuditChain(); audit.append('release_candidate',{part:121}); audit.append('storage_digest',{digest:s.digest()}); gate.add('audit-integrity',audit.verify(),'hash chain verifies');
const result=gate.result(); console.log(JSON.stringify(result,null,2)); if(!result.pass) process.exit(1);
