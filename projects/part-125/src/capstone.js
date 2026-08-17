import crypto from 'node:crypto';

export class EvidenceBundle {
  constructor(){this.items=[];}
  add(name,pass,details={}){this.items.push({name,pass:Boolean(pass),details});}
  passed(){return this.items.length>0 && this.items.every(i=>i.pass);}
  digest(){return crypto.createHash('sha256').update(JSON.stringify(this.items)).digest('hex');}
}

export class ArchitectureScorecard {
  constructor(weights={reliability:2,security:2,data:2,operations:2,delivery:1,cost:1}){this.weights=weights;this.scores={};}
  set(area,score){if(!(area in this.weights))throw new Error('unknown area');if(score<0||score>5)throw new Error('score range');this.scores[area]=score;}
  weighted(){let n=0,d=0;for(const [a,w] of Object.entries(this.weights)){n+=(this.scores[a]??0)*w;d+=5*w;}return d?n/d:0;}
}

export class ReleaseGate {
  constructor(required=[]){this.required=required;}
  evaluate(evidence){const by=new Map(evidence.items.map(i=>[i.name,i]));const missing=this.required.filter(r=>!by.has(r));const failing=this.required.filter(r=>by.has(r)&&!by.get(r).pass);return {pass:missing.length===0&&failing.length===0,missing,failing};}
}

export class RecoveryObjective {
  constructor({rpoMs,rtoMs}){Object.assign(this,{rpoMs,rtoMs});}
  meets({lostMs,recoveryMs}){return lostMs<=this.rpoMs&&recoveryMs<=this.rtoMs;}
}

export class RiskRegister {
  constructor(){this.items=[];}
  add({id,likelihood,impact,mitigation,status='open'}){this.items.push({id,likelihood,impact,mitigation,status});}
  priority(){return [...this.items].sort((a,b)=>(b.likelihood*b.impact)-(a.likelihood*a.impact));}
  unresolvedCritical(threshold=12){return this.items.filter(i=>i.status!=='closed'&&i.likelihood*i.impact>=threshold);}
}

export class ChangeBudget {
  constructor(limit){this.limit=limit;this.used=0;}
  consume(risk){if(this.used+risk>this.limit)return false;this.used+=risk;return true;}
}

export class Certification {
  constructor({minScore=.8,requiredEvidence=[]}={}){this.minScore=minScore;this.requiredEvidence=requiredEvidence;}
  decide({scorecard,evidence}){const gate=new ReleaseGate(this.requiredEvidence).evaluate(evidence);const score=scorecard.weighted();return {certified:gate.pass&&score>=this.minScore,score,gate,evidenceDigest:evidence.digest()};}
}

export function dependencyCriticality({availabilityImpact,dataImpact,securityImpact,recoveryComplexity}){return availabilityImpact+dataImpact+securityImpact+recoveryComplexity;}
export function migrationReady({backwardCompatible,rollbackTested,dataBackfillVerified,observabilityReady}){return [backwardCompatible,rollbackTested,dataBackfillVerified,observabilityReady].every(Boolean);}
export function chaosResult({steadyStateBefore,steadyStateDuring,recovered,unexpectedDataLoss}){return steadyStateBefore&&steadyStateDuring&&recovered&&!unexpectedDataLoss;}
