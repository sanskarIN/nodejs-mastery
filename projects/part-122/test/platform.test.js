import test from 'node:test'; import assert from 'node:assert/strict';
import {RetryBudget,CircuitBreaker,Bulkhead,AdaptiveLimiter,deadlineRemaining,childDeadline,ServiceRegistry,CanaryRouter,IdempotencyStore,HealthGate,TraceContext,hedgeAllowed} from '../src/platform.js';

test('retry budget bounds amplification',()=>{const b=new RetryBudget({capacity:2,refillPerSecond:0}); assert.equal(b.take(0),true);assert.equal(b.take(0),true);assert.equal(b.take(0),false);});
test('circuit opens and probes half-open',()=>{const c=new CircuitBreaker({failureThreshold:2,openMs:10}); c.failure(0);c.failure(1);assert.equal(c.allow(5),false);assert.equal(c.allow(20),true);c.success();assert.equal(c.state,'closed');});
test('bulkhead caps concurrency',()=>{const b=new Bulkhead(2);assert.ok(b.enter());assert.ok(b.enter());assert.equal(b.enter(),false);b.leave();assert.ok(b.enter());});
test('adaptive limiter falls on latency and rises on healthy headroom',()=>{const a=new AdaptiveLimiter({initial:4,targetMs:100});assert.equal(a.observe(200),3);assert.equal(a.observe(50),4);});
test('deadlines only shrink downstream',()=>{assert.equal(deadlineRemaining(100,40),60);assert.equal(childDeadline(100,40,20),60);assert.equal(childDeadline(100,40,90),100);});
test('registry returns only ready instances',()=>{const r=new ServiceRegistry();r.upsert('pay',{id:'a',ready:false});r.upsert('pay',{id:'b',ready:true});assert.equal(r.healthy('pay').length,1);assert.equal(r.choose('pay','order-1').id,'b');});
test('canary routing is deterministic',()=>{const r=new CanaryRouter({percent:50});assert.equal(r.route('abc'),r.route('abc'));});
test('idempotency returns first result',()=>{const s=new IdempotencyStore();const a=s.execute('k',()=>1);const b=s.execute('k',()=>2);assert.equal(a.result,1);assert.equal(b.result,1);assert.equal(b.duplicate,true);});
test('health gate distinguishes readiness',()=>{const h=new HealthGate({maxEventLoopDelayMs:50,maxDependencyFailures:0});assert.equal(h.readiness({eventLoopDelayMs:10,dependencyFailures:0}),true);assert.equal(h.readiness({eventLoopDelayMs:90,dependencyFailures:0}),false);});
test('trace child preserves trace id',()=>{const p=TraceContext.create();const c=TraceContext.create(p);assert.equal(c.traceId,p.traceId);assert.equal(c.parentSpanId,p.spanId);});
test('hedging requires safe idempotency and elapsed threshold',()=>{assert.equal(hedgeAllowed({idempotent:true,remainingMs:100,firstAttemptElapsedMs:80,hedgeAfterMs:50}),true);assert.equal(hedgeAllowed({idempotent:false,remainingMs:100,firstAttemptElapsedMs:80,hedgeAfterMs:50}),false);});
