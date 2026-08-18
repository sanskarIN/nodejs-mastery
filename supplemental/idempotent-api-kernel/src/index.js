import { createHash } from 'node:crypto';
export function fingerprint(value){return createHash('sha256').update(JSON.stringify(value)).digest('hex');}
export class IdempotencyStore {
  constructor({ ttlMs=60_000, now=()=>Date.now() }={}){this.ttlMs=ttlMs; this.now=now; this.map=new Map();}
  prune(){const t=this.now(); for(const [k,v] of this.map) if(v.expiresAt<=t) this.map.delete(k);}
  async execute(key,request,effect){ if(typeof key!=='string'||!key) throw new TypeError('idempotency key required'); this.prune(); const fp=fingerprint(request); const existing=this.map.get(key); if(existing){ if(existing.fingerprint!==fp) return {status:'conflict'}; return {status:'replay',value:existing.value}; } const value=await effect(); this.map.set(key,{fingerprint:fp,value,expiresAt:this.now()+this.ttlMs}); return {status:'created',value}; }
}
