import test from 'node:test'; import assert from 'node:assert/strict';
import {Histogram,SLOWindow,burnRate,CardinalityGuard,LoadShedder,CapacityModel,CostLedger,TraceSampler,LeakSlope,queueingDelay,apdex} from '../src/ops.js';

test('histogram percentile',()=>{const h=new Histogram();[10,20,30,40,50].forEach(v=>h.observe(v));assert.equal(h.percentile(.95),50);});
test('slo budget tracks bad events',()=>{const s=new SLOWindow({target:.9});for(let i=0;i<9;i++)s.record(true);s.record(false);assert.equal(s.availability(),.9);assert.ok(Math.abs(s.errorBudgetRemaining())<1e-9);});
test('burn rate compares to allowed error rate',()=>{assert.equal(Math.round(burnRate({bad:10,total:1000,target:.99})),1);});
test('cardinality guard detects label explosion',()=>{const g=new CardinalityGuard(2);assert.ok(g.accept('user','a'));assert.ok(g.accept('user','b'));assert.equal(g.accept('user','c'),false);});
test('load shedder protects saturation',()=>{const l=new LoadShedder({maxInFlight:2,maxEventLoopDelayMs:50});assert.ok(l.admit({inFlight:1,eventLoopDelayMs:10}));assert.equal(l.admit({inFlight:2,eventLoopDelayMs:10}),false);assert.equal(l.admit({inFlight:1,eventLoopDelayMs:90}),false);});
test('capacity model estimates utilization',()=>{const c=new CapacityModel({serviceTimeMs:100,concurrency:10});assert.equal(c.theoreticalRps(),100);assert.equal(c.utilization(50),.5);});
test('cost ledger aggregates tenant usage',()=>{const c=new CostLedger();c.add({tenant:'a',operation:'x',cost:2});c.add({tenant:'b',operation:'x',cost:3});assert.equal(c.total({operation:'x'}),5);assert.equal(c.total({tenant:'a'}),2);});
test('trace sampler always samples errors and slow requests',()=>{const s=new TraceSampler({baseRate:0});assert.ok(s.shouldSample({error:true}));assert.ok(s.shouldSample({latencyMs:1000,slowMs:500}));assert.equal(s.shouldSample({latencyMs:10,random:1}),false);});
test('leak slope identifies growth',()=>{const l=new LeakSlope();l.add(0,100);l.add(10,200);assert.equal(l.slope(),10);});
test('queueing delay diverges at saturation',()=>{assert.equal(queueingDelay({arrivalRps:10,serviceRps:10}),Infinity);assert.equal(queueingDelay({arrivalRps:5,serviceRps:10}),200);});
test('apdex weights tolerating samples',()=>{assert.equal(apdex([50,100,300,500],{targetMs:100}),.625);});
