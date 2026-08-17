'use strict';
const { createHash } = require('node:crypto');
const hash=(x)=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
class BackupManager {
  create(store){ const payload={commitVersion:store.commitVersion,rows:[...store.rows].sort(([a],[b])=>a.localeCompare(b))}; return {payload:structuredClone(payload),checksum:hash(payload)}; }
  verify(backup){ return backup?.checksum===hash(backup?.payload); }
  restore(backup,StoreClass){ if(!this.verify(backup))throw new Error('BACKUP_CHECKSUM_MISMATCH'); const s=new StoreClass(); s.rows=new Map(structuredClone(backup.payload.rows)); s.commitVersion=backup.payload.commitVersion; return s; }
}
module.exports={BackupManager};
