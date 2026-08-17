'use strict';
class UniqueReservation {
  constructor(){ this.claims=new Map(); }
  reserve(value,{owner,epoch=1}){
    const cur=this.claims.get(value);
    if(cur && (cur.owner!==owner || cur.epoch>epoch)) return {ok:false,owner:cur.owner,epoch:cur.epoch};
    const claim={value,owner,epoch}; this.claims.set(value,claim); return {ok:true,...claim};
  }
  release(value,{owner,epoch}){ const cur=this.claims.get(value); if(!cur||cur.owner!==owner||cur.epoch!==epoch) return false; this.claims.delete(value); return true; }
}
module.exports = { UniqueReservation };
