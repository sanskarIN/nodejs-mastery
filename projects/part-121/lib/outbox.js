'use strict';
class AtomicBusinessStore {
  constructor(){ this.business=new Map(); this.outbox=new Map(); }
  transact({businessKey,businessValue,event}){
    if(this.outbox.has(event.id)) return {duplicate:true,event:this.outbox.get(event.id)};
    const old=this.business.has(businessKey)?structuredClone(this.business.get(businessKey)):undefined;
    try{
      this.business.set(businessKey,structuredClone(businessValue));
      this.outbox.set(event.id,{...structuredClone(event),published:false});
      return {duplicate:false,event:this.outbox.get(event.id)};
    }catch(e){ if(old===undefined)this.business.delete(businessKey); else this.business.set(businessKey,old); throw e; }
  }
  markPublished(id){ const e=this.outbox.get(id); if(!e)throw new Error('NO_EVENT'); e.published=true; }
}
module.exports={AtomicBusinessStore};
