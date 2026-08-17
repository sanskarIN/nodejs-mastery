export class HistoryBuffer {
  constructor(limit=40){this.limit=limit;this.frames=[];}
  record(state){this.frames.push(structuredClone(state));while(this.frames.length>this.limit)this.frames.shift();}
  stateAt(tick){return this.frames.find(f=>f.tick===tick)??null;}
  nearestAtOrBefore(tick){return [...this.frames].reverse().find(f=>f.tick<=tick)??null;}
}
export function boundedRewindTick({serverTick,reportedTick,maxRewindTicks=6}) { return Math.max(serverTick-maxRewindTicks,Math.min(serverTick,reportedTick)); }
export function validateProximity(state,a,b,maxDistance=1){const p=state.players[a],q=state.players[b];if(!p||!q)return false;return Math.hypot(p.x-q.x,p.y-q.y)<=maxDistance;}
