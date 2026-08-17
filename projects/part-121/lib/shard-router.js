'use strict';
class ShardRouter {
  constructor(ranges) { this.epoch = 1; this.ranges = ranges.map(r => ({...r})); this.validate(); }
  validate() {
    const sorted = [...this.ranges].sort((a,b)=>a.start-b.start);
    for (let i=0;i<sorted.length;i++) {
      if (sorted[i].start >= sorted[i].end) throw new Error('BAD_RANGE');
      if (i && sorted[i-1].end !== sorted[i].start) throw new Error('RANGE_GAP_OR_OVERLAP');
    }
  }
  route(value) { const r=this.ranges.find(x=>value>=x.start && value<x.end); if(!r) throw new Error('NO_ROUTE'); return { shard:r.shard, epoch:this.epoch }; }
  reshard({ start, end, shard }) {
    const next=[];
    for(const r of this.ranges){
      if(end<=r.start || start>=r.end) next.push(r);
      else {
        if(start>r.start) next.push({start:r.start,end:start,shard:r.shard});
        next.push({start:Math.max(start,r.start),end:Math.min(end,r.end),shard});
        if(end<r.end) next.push({start:end,end:r.end,shard:r.shard});
      }
    }
    this.ranges=next.sort((a,b)=>a.start-b.start); this.validate(); this.epoch++; return this.epoch;
  }
}
module.exports = { ShardRouter };
