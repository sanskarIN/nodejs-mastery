export class ShutdownCoordinator {
  constructor(){this.hooks=[]; this.state='running'; this.reason=null; this.result=null; this.promise=null;}
  add(name,fn){if(this.state!=='running') throw new Error('cannot add shutdown hook after shutdown begins'); if(typeof name!=='string'||!name||typeof fn!=='function') throw new TypeError('name and function are required'); this.hooks.push({name,fn}); return this;}
  shutdown(reason='shutdown'){
    if(this.promise) return this.promise;
    this.state='stopping'; this.reason=reason;
    this.promise=(async()=>{const completed=[]; const failures=[]; for(const hook of this.hooks){try{await hook.fn({reason}); completed.push(hook.name);}catch(error){failures.push({name:hook.name,message:String(error?.message??error)});}} this.state='stopped'; this.result={reason,completed,failures}; return this.result;})();
    return this.promise;
  }
  snapshot(){return {state:this.state,reason:this.reason,hooks:this.hooks.map(h=>h.name),result:this.result};}
}
