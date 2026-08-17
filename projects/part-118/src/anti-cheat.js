export class TokenBucket {
  constructor({capacity=10,refillPerSecond=5,now=()=>Date.now()}={}){this.capacity=capacity;this.refillPerSecond=refillPerSecond;this.now=now;this.tokens=capacity;this.last=now();}
  take(cost=1){const n=this.now();this.tokens=Math.min(this.capacity,this.tokens+((n-this.last)/1000)*this.refillPerSecond);this.last=n;if(this.tokens<cost)return false;this.tokens-=cost;return true;}
}
export function validateMotionBudget(command,{maxMagnitude=1}={}){return Math.hypot(command.dx,command.dy)<=maxMagnitude+1e-9;}
export function suspicionScore(signals){const weights={rate:2,impossibleMotion:5,clockSkew:1,duplicate:1,invalidSchema:3};return Object.entries(signals).reduce((n,[k,v])=>n+(weights[k]??1)*(Number(v)||0),0);}
export function enforcementFor(score){if(score>=10)return'block';if(score>=5)return'challenge-or-shadow-review';if(score>=2)return'throttle';return'allow';}
