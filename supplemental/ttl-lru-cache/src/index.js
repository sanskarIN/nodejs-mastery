export class TtlLruCache {
  constructor({ maxEntries = 100, ttlMs = 60_000, now = () => Date.now() } = {}) {
    if (!Number.isInteger(maxEntries) || maxEntries < 1) throw new TypeError('maxEntries must be positive');
    this.maxEntries=maxEntries; this.ttlMs=ttlMs; this.now=now; this.map=new Map(); this.hits=0; this.misses=0; this.evictions=0;
  }
  set(key,value,ttlMs=this.ttlMs){ const expiresAt=this.now()+ttlMs; this.map.delete(key); this.map.set(key,{value,expiresAt}); while(this.map.size>this.maxEntries){ const oldest=this.map.keys().next().value; this.map.delete(oldest); this.evictions++; } return value; }
  get(key){ const item=this.map.get(key); if(!item){this.misses++; return undefined;} if(item.expiresAt<=this.now()){this.map.delete(key); this.misses++; return undefined;} this.map.delete(key); this.map.set(key,item); this.hits++; return item.value; }
  delete(key){ return this.map.delete(key); }
  clear(){ this.map.clear(); }
  stats(){ return {size:this.map.size,hits:this.hits,misses:this.misses,evictions:this.evictions}; }
}
