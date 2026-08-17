'use strict';
class VersionedCache {
  constructor() { this.entries = new Map(); this.writeBehind = []; }
  put(key, value, version) { const cur=this.entries.get(key); if(!cur || version>=cur.version) this.entries.set(key,{value:structuredClone(value),version}); }
  get(key,{minVersion=0}={}) { const e=this.entries.get(key); if(!e || e.version<minVersion) return null; return structuredClone(e); }
  invalidate(key, version) { const e=this.entries.get(key); if(!e || e.version<=version) this.entries.delete(key); }
  enqueueWrite(key,value,baseVersion){ this.writeBehind.push({key,value:structuredClone(value),baseVersion}); }
  flush(store){ const results=[]; while(this.writeBehind.length){ const w=this.writeBehind.shift(); try { results.push(store.compareAndSet(w.key,w.baseVersion,w.value)); } catch(e){ results.push({error:e.code||e.message,key:w.key}); } } return results; }
}
module.exports = { VersionedCache };
