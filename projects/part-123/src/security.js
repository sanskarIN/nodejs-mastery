import crypto from 'node:crypto';
const b64u = b => Buffer.from(b).toString('base64url');

export class TokenService {
  constructor(keys){ this.keys=new Map(Object.entries(keys)); }
  sign(claims,{kid='k1',ttlSec=300,nowSec=0}={}){ const header={alg:'HS256',typ:'JWT',kid}; const payload={...claims,iat:nowSec,exp:nowSec+ttlSec}; const body=`${b64u(JSON.stringify(header))}.${b64u(JSON.stringify(payload))}`; const key=this.keys.get(kid); if(!key) throw new Error('unknown key'); const sig=crypto.createHmac('sha256',key).update(body).digest('base64url'); return `${body}.${sig}`; }
  verify(token,{aud,nowSec=0}={}){ const [h,p,s]=token.split('.'); const header=JSON.parse(Buffer.from(h,'base64url')); const claims=JSON.parse(Buffer.from(p,'base64url')); const key=this.keys.get(header.kid); if(!key) throw new Error('unknown kid'); const expected=crypto.createHmac('sha256',key).update(`${h}.${p}`).digest('base64url'); if(!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected))) throw new Error('bad signature'); if(nowSec>=claims.exp) throw new Error('expired'); if(aud && claims.aud!==aud) throw new Error('bad audience'); return claims; }
}

export class PolicyEngine {
  constructor(rules=[]){ this.rules=rules; }
  decide(input){ for(const r of this.rules){ if(r.match(input)) return r.effect; } return 'deny'; }
}

export class NonceGuard {
  constructor(){ this.seen=new Set(); }
  accept(nonce){ if(this.seen.has(nonce)) return false; this.seen.add(nonce); return true; }
}

export class SecretLease {
  constructor({value,expiresAt,version}){ Object.assign(this,{value,expiresAt,version}); }
  usable(now){ return now<this.expiresAt; }
}

export class RotationSet {
  constructor(active,previous=null){ this.active=active; this.previous=previous; }
  accepts(version){ return version===this.active || version===this.previous; }
}

export class AbuseLimiter {
  constructor({capacity=5,windowMs=1000}={}){this.capacity=capacity;this.windowMs=windowMs;this.state=new Map();}
  allow(key,now){let s=this.state.get(key);if(!s||now-s.start>=this.windowMs)s={start:now,count:0};s.count++;this.state.set(key,s);return s.count<=this.capacity;}
}

export class AuditChain {
  constructor(){ this.records=[]; }
  append(type,data){ const prev=this.records.at(-1)?.hash||'GENESIS'; const body=JSON.stringify({index:this.records.length,type,data,prev}); const hash=crypto.createHash('sha256').update(body).digest('hex'); const rec={index:this.records.length,type,data,prev,hash}; this.records.push(rec); return rec; }
  verify(){ let prev='GENESIS'; for(const r of this.records){ const body=JSON.stringify({index:r.index,type:r.type,data:r.data,prev:r.prev}); const hash=crypto.createHash('sha256').update(body).digest('hex'); if(r.prev!==prev||r.hash!==hash) return false; prev=r.hash; } return true; }
}

export function redact(value){ return String(value).replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+/g,'[email]').replace(/\b\d{12,16}\b/g,'[number]'); }
export function sha256(data){ return crypto.createHash('sha256').update(data).digest('hex'); }
export function verifyArtifact({bytes,expectedSha256}){ return sha256(bytes)===expectedSha256; }
export function constantTimeEqual(a,b){ const A=Buffer.from(a),B=Buffer.from(b); return A.length===B.length && crypto.timingSafeEqual(A,B); }
