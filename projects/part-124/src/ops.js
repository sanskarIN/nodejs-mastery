export class Histogram {
  constructor(bounds=[10,50,100,250,500,1000]){this.bounds=bounds;this.values=[];}
  observe(v){this.values.push(v);}
  percentile(p){if(!this.values.length)return 0;const a=[...this.values].sort((x,y)=>x-y);return a[Math.min(a.length-1,Math.ceil(p*a.length)-1)];}
}

export class SLOWindow {
  constructor({target=0.999}={}){this.target=target;this.good=0;this.total=0;}
  record(ok){this.total++;if(ok)this.good++;}
  availability(){return this.total?this.good/this.total:1;}
  errorBudgetRemaining(){const allowed=this.total*(1-this.target);const bad=this.total-this.good;return allowed-bad;}
}

export function burnRate({bad,total,target}){ if(!total)return 0; const allowed=1-target; return allowed===0?Infinity:(bad/total)/allowed; }

export class CardinalityGuard {
  constructor(limit=100){this.limit=limit;this.values=new Map();}
  accept(label,value){const s=this.values.get(label)||new Set();s.add(value);this.values.set(label,s);return s.size<=this.limit;}
}

export class LoadShedder {
  constructor({maxInFlight=10,maxEventLoopDelayMs=100}={}){Object.assign(this,{maxInFlight,maxEventLoopDelayMs});}
  admit({inFlight,eventLoopDelayMs,priority='normal'}){ if(priority==='critical' && inFlight<this.maxInFlight) return true; return inFlight<this.maxInFlight && eventLoopDelayMs<=this.maxEventLoopDelayMs; }
}

export class CapacityModel {
  constructor({serviceTimeMs,concurrency}){Object.assign(this,{serviceTimeMs,concurrency});}
  theoreticalRps(){return this.serviceTimeMs>0?(1000/this.serviceTimeMs)*this.concurrency:Infinity;}
  utilization(arrivalRps){return arrivalRps/this.theoreticalRps();}
}

export class CostLedger {
  constructor(){this.entries=[];}
  add({tenant,operation,cost}){this.entries.push({tenant,operation,cost});}
  total(filter={}){return this.entries.filter(e=>(!filter.tenant||e.tenant===filter.tenant)&&(!filter.operation||e.operation===filter.operation)).reduce((s,e)=>s+e.cost,0);}
}

export class TraceSampler {
  constructor({baseRate=0.01}={}){this.baseRate=baseRate;}
  shouldSample({error=false,latencyMs=0,slowMs=500,random=0}){return error||latencyMs>=slowMs||random<this.baseRate;}
}

export class LeakSlope {
  constructor(){this.points=[];}
  add(t,bytes){this.points.push([t,bytes]);}
  slope(){if(this.points.length<2)return 0;const [t1,b1]=this.points[0],[t2,b2]=this.points.at(-1);return (b2-b1)/Math.max(1,t2-t1);}
}

export function queueingDelay({arrivalRps,serviceRps}){ if(arrivalRps>=serviceRps)return Infinity; return 1000/(serviceRps-arrivalRps); }
export function apdex(samples,{targetMs}){ if(!samples.length)return 1;let s=0;for(const v of samples)s+=v<=targetMs?1:v<=targetMs*4?0.5:0;return s/samples.length; }
