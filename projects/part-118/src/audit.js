import { createHash } from 'node:crypto';
const h=x=>createHash('sha256').update(x).digest('hex');
export function appendAudit(chain,event){const previous=chain.at(-1)?.hash??'GENESIS';const body={index:chain.length,previous,event};const entry={...body,hash:h(JSON.stringify(body))};chain.push(entry);return entry;}
export function verifyAudit(chain){let prev='GENESIS';for(let i=0;i<chain.length;i++){const e=chain[i];const body={index:i,previous:prev,event:e.event};if(e.index!==i||e.previous!==prev||e.hash!==h(JSON.stringify(body)))return false;prev=e.hash;}return true;}
