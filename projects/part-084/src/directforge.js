import {createHash} from 'node:crypto';
export function validatePair(p){if(!p||!p.id||typeof p.prompt!=='string'||typeof p.chosen!=='string'||typeof p.rejected!=='string'||p.chosen===p.rejected)throw new Error('invalid pair');return true}
export function margin(chosenLogP,rejectedLogP){return chosenLogP-rejectedLogP}
export function relativeMargin(cChosen,cRejected,rChosen,rRejected){return margin(cChosen,cRejected)-margin(rChosen,rRejected)}
export function logisticScore(rel,beta=1){if(!(beta>0))throw new Error('beta'); return 1/(1+Math.exp(-beta*rel))}
export const objectives=Object.freeze({DPO:{reference:true,pairs:true},IPO:{reference:true,pairs:true},KTO:{reference:false,pairs:false},ORPO:{reference:false,pairs:true},SIMPO:{reference:false,pairs:true}});
export function manifest(x){const canonical=JSON.stringify(x,Object.keys(x).sort());return {data:structuredClone(x),sha256:createHash('sha256').update(canonical).digest('hex')}}
export function releaseGate({criticalFailures=0,holdout=0,minHoldout=.6,approved=false}){return {allowed:criticalFailures===0&&holdout>=minHoldout&&approved,reasons:[...(criticalFailures?['critical_failure']:[]),...(holdout<minHoldout?['holdout_below_threshold']:[]),...(!approved?['missing_approval']:[])]}}
