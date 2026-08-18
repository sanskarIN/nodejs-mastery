export class TokenBucketLimiter {
  constructor({ capacity = 10, refillPerSecond = 5, now = () => Date.now() } = {}) { if(capacity<=0||refillPerSecond<=0) throw new TypeError('capacity/refill must be positive'); this.capacity=capacity; this.refillPerMs=refillPerSecond/1000; this.now=now; this.buckets=new Map(); }
  #bucket(key){ const t=this.now(); let b=this.buckets.get(key); if(!b){b={tokens:this.capacity,updatedAt:t}; this.buckets.set(key,b); return b;} const elapsed=Math.max(0,t-b.updatedAt); b.tokens=Math.min(this.capacity,b.tokens+elapsed*this.refillPerMs); b.updatedAt=t; return b; }
  take(key,cost=1){ if(cost<=0||cost>this.capacity) throw new RangeError('invalid cost'); const b=this.#bucket(key); if(b.tokens>=cost){b.tokens-=cost; return {allowed:true,remaining:Math.floor(b.tokens),retryAfterMs:0};} const deficit=cost-b.tokens; return {allowed:false,remaining:Math.floor(b.tokens),retryAfterMs:Math.ceil(deficit/this.refillPerMs)}; }
  delete(key){return this.buckets.delete(key);} clear(){this.buckets.clear();}
}
