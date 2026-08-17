import {Histogram,SLOWindow,burnRate,CapacityModel,LoadShedder,TraceSampler,CostLedger} from './src/ops.js';
const h=new Histogram();[20,30,60,120,700].forEach(v=>h.observe(v));console.log('p95',h.percentile(.95));
const slo=new SLOWindow({target:.99});for(let i=0;i<98;i++)slo.record(true);for(let i=0;i<2;i++)slo.record(false);console.log('availability',slo.availability(),'burn',burnRate({bad:2,total:100,target:.99}));
const capacity=new CapacityModel({serviceTimeMs:50,concurrency:20});console.log('capacity rps',capacity.theoreticalRps(),'utilization@200',capacity.utilization(200));
console.log('shed?',new LoadShedder({maxInFlight:10,maxEventLoopDelayMs:100}).admit({inFlight:9,eventLoopDelayMs:150}));
console.log('trace slow?',new TraceSampler({baseRate:.01}).shouldSample({latencyMs:900,random:.9}));
const costs=new CostLedger();costs.add({tenant:'a',operation:'render',cost:4});costs.add({tenant:'a',operation:'render',cost:5});console.log('cost',costs.total({tenant:'a'}));
