import crypto from 'node:crypto';

export class RetryBudget {
  constructor({capacity=10, refillPerSecond=1}={}) { this.capacity=capacity; this.tokens=capacity; this.refillPerSecond=refillPerSecond; this.last=0; }
  refill(nowMs){ const d=Math.max(0,nowMs-this.last)/1000; this.tokens=Math.min(this.capacity,this.tokens+d*this.refillPerSecond); this.last=nowMs; }
  take(nowMs,cost=1){ this.refill(nowMs); if(this.tokens<cost) return false; this.tokens-=cost; return true; }
}

export class CircuitBreaker {
  constructor({failureThreshold=3, openMs=1000, halfOpenMax=1}={}) { Object.assign(this,{failureThreshold,openMs,halfOpenMax}); this.state='closed'; this.failures=0; this.openedAt=0; this.halfOpenInFlight=0; }
  allow(nowMs){
    if(this.state==='open' && nowMs-this.openedAt>=this.openMs) this.state='half-open';
    if(this.state==='open') return false;
    if(this.state==='half-open' && this.halfOpenInFlight>=this.halfOpenMax) return false;
    if(this.state==='half-open') this.halfOpenInFlight++;
    return true;
  }
  success(){ this.failures=0; this.halfOpenInFlight=0; this.state='closed'; }
  failure(nowMs){ this.halfOpenInFlight=0; this.failures++; if(this.failures>=this.failureThreshold){ this.state='open'; this.openedAt=nowMs; } }
}

export class Bulkhead {
  constructor(limit=4){ this.limit=limit; this.inFlight=0; }
  enter(){ if(this.inFlight>=this.limit) return false; this.inFlight++; return true; }
  leave(){ this.inFlight=Math.max(0,this.inFlight-1); }
}

export class AdaptiveLimiter {
  constructor({min=1,max=20,initial=4,targetMs=100}={}){ Object.assign(this,{min,max,targetMs}); this.limit=initial; }
  observe(latencyMs, ok=true){
    if(!ok || latencyMs>this.targetMs*1.5) this.limit=Math.max(this.min,this.limit-1);
    else if(latencyMs<this.targetMs*0.8) this.limit=Math.min(this.max,this.limit+1);
    return this.limit;
  }
}

export function deadlineRemaining(deadlineMs, nowMs){ return Math.max(0, deadlineMs-nowMs); }
export function childDeadline(parentDeadlineMs, nowMs, localCapMs){ return nowMs + Math.min(deadlineRemaining(parentDeadlineMs,nowMs), localCapMs); }

export class ServiceRegistry {
  constructor(){ this.instances=new Map(); }
  upsert(service, instance){ const arr=this.instances.get(service)||[]; const next=arr.filter(x=>x.id!==instance.id); next.push({...instance}); this.instances.set(service,next); }
  healthy(service){ return (this.instances.get(service)||[]).filter(x=>x.ready===true); }
  choose(service,key=''){ const a=this.healthy(service); if(!a.length) return null; const h=crypto.createHash('sha256').update(key).digest().readUInt32BE(0); return a[h%a.length]; }
}

export class CanaryRouter {
  constructor({stable='v1',canary='v2',percent=0}={}){ Object.assign(this,{stable,canary,percent}); }
  route(requestId){ const n=crypto.createHash('sha256').update(String(requestId)).digest().readUInt32BE(0)%100; return n<this.percent?this.canary:this.stable; }
}

export class IdempotencyStore {
  constructor(){ this.map=new Map(); }
  execute(key, fn){ if(this.map.has(key)) return {duplicate:true,result:this.map.get(key)}; const result=fn(); this.map.set(key,result); return {duplicate:false,result}; }
}

export class HealthGate {
  constructor({maxEventLoopDelayMs=200,maxDependencyFailures=0}={}){ Object.assign(this,{maxEventLoopDelayMs,maxDependencyFailures}); }
  readiness({eventLoopDelayMs,dependencyFailures}){ return eventLoopDelayMs<=this.maxEventLoopDelayMs && dependencyFailures<=this.maxDependencyFailures; }
}

export class TraceContext {
  static create(parent=null){ return {traceId: parent?.traceId||crypto.randomUUID().replaceAll('-',''), spanId:crypto.randomUUID().slice(0,16), parentSpanId:parent?.spanId||null}; }
}

export function hedgeAllowed({idempotent, remainingMs, firstAttemptElapsedMs, hedgeAfterMs}){
  return Boolean(idempotent && remainingMs>0 && firstAttemptElapsedMs>=hedgeAfterMs);
}
