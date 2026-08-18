export class EventConsumer {
  constructor(){this.offsets=new Map(); this.seen=new Set(); this.quarantine=[];}
  async consume(event,handler){ if(!event||typeof event.id!=='string'||!Number.isInteger(event.partition)||!Number.isInteger(event.offset)) throw new TypeError('invalid event'); const key=`${event.partition}:${event.id}`; const last=this.offsets.get(event.partition)??-1; if(event.offset<=last||this.seen.has(key)) return {status:'duplicate'}; try{const value=await handler(event); this.seen.add(key); this.offsets.set(event.partition,event.offset); return {status:'processed',value};}catch(error){ if(error?.poison===true){this.quarantine.push({event,message:error.message}); return {status:'quarantined'};} throw error; } }
}
