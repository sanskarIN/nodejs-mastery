import { createHash } from 'node:crypto';
function canonical(value) { if (Array.isArray(value)) return value.map(canonical); if (value&&typeof value==='object') return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])); return value; }
export function hashObject(value) { return createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex'); }
export function makeSnapshot(state,{baselineId=null}={}) { const body={snapshotId:`s-${state.epoch}-${state.tick}`,baselineId,tick:state.tick,epoch:state.epoch,state:structuredClone(state)}; return {...body,hash:hashObject(body)}; }
export function verifySnapshot(s) { const {hash,...body}=s; return typeof hash==='string' && hashObject(body)===hash; }
export class SnapshotRing { constructor(limit=32){this.limit=limit;this.items=[];} push(s){this.items.push(s);while(this.items.length>this.limit)this.items.shift();} atOrBefore(t){return [...this.items].reverse().find(s=>s.tick<=t)??null;} latest(){return this.items.at(-1)??null;} }
