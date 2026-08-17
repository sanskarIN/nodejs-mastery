'use strict';
const { createHash } = require('node:crypto');
const digest=(v)=>createHash('sha256').update(v).digest('hex');
class AuditChain {
  constructor(){this.entries=[];}
  append(type,data){const prev=this.entries.at(-1)?.hash||'GENESIS';const body={index:this.entries.length,type,data:structuredClone(data),prev};const hash=digest(JSON.stringify(body));const entry={...body,hash};this.entries.push(entry);return entry;}
  verify(){let prev='GENESIS';for(let i=0;i<this.entries.length;i++){const e=this.entries[i];const body={index:i,type:e.type,data:e.data,prev};if(e.prev!==prev||digest(JSON.stringify(body))!==e.hash)return false;prev=e.hash;}return true;}
}
module.exports={AuditChain};
