import { simulateTick, stateDigest } from './authority.js';
export class RollbackEngine {
  constructor(initial, historyLimit=64){this.state=structuredClone(initial);this.history=new Map([[initial.tick,structuredClone(initial)]]);this.commands=new Map();this.historyLimit=historyLimit;}
  addCommand(tick,cmd){const arr=this.commands.get(tick)??[];arr.push(cmd);this.commands.set(tick,arr);}
  step(){const target=this.state.tick+1;this.state=simulateTick(this.state,this.commands.get(target)??[]).state;this.history.set(this.state.tick,structuredClone(this.state));this.#trim();return this.state;}
  rollbackFrom(tick, throughTick=this.state.tick){const base=this.history.get(tick-1);if(!base)throw new Error('rollback base unavailable');this.state=structuredClone(base);for(let t=tick;t<=throughTick;t++){this.state=simulateTick(this.state,this.commands.get(t)??[]).state;this.history.set(t,structuredClone(this.state));}this.#trim();return this.state;}
  digest(){return stateDigest(this.state);}
  #trim(){while(this.history.size>this.historyLimit){this.history.delete(Math.min(...this.history.keys()));}}
}
