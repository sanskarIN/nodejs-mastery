export class CircuitBreaker {
  constructor({ failureThreshold=3, cooldownMs=1000, now=()=>Date.now() }={}){if(!Number.isInteger(failureThreshold)||failureThreshold<1) throw new TypeError('failureThreshold must be positive'); this.failureThreshold=failureThreshold; this.cooldownMs=cooldownMs; this.now=now; this.state='closed'; this.failures=0; this.openedAt=null; this.probeInFlight=false;}
  async execute(action){
    const t=this.now();
    if(this.state==='open'){
      if(t-this.openedAt<this.cooldownMs) throw Object.assign(new Error('circuit-open'),{code:'CIRCUIT_OPEN'});
      this.state='half-open';
    }
    if(this.state==='half-open'&&this.probeInFlight) throw Object.assign(new Error('circuit-probe-in-flight'),{code:'CIRCUIT_OPEN'});
    if(this.state==='half-open') this.probeInFlight=true;
    try{const value=await action(); this.failures=0; this.state='closed'; this.openedAt=null; return value;}
    catch(error){this.failures+=1; if(this.state==='half-open'||this.failures>=this.failureThreshold){this.state='open'; this.openedAt=t;} throw error;}
    finally{this.probeInFlight=false;}
  }
  snapshot(){return {state:this.state,failures:this.failures,openedAt:this.openedAt};}
}
