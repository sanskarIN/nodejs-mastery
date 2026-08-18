export class ServiceHealth {
  constructor(required=[]){this.required=new Set(required); this.dependencies=new Map(required.map(x=>[x,false])); this.draining=false; this.started=true;}
  setDependency(name,healthy){if(!this.dependencies.has(name)) throw new Error(`unknown dependency: ${name}`); this.dependencies.set(name,Boolean(healthy));}
  beginDrain(){this.draining=true;}
  liveness(){return {ok:this.started,status:this.started?200:500};}
  readiness(){const missing=[...this.required].filter(x=>!this.dependencies.get(x)); const ok=!this.draining&&missing.length===0; return {ok,status:ok?200:503,draining:this.draining,missing};}
}
