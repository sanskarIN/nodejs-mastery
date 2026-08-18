import test from 'node:test'; import assert from 'node:assert/strict'; import {TokenBucketLimiter} from '../src/index.js';
test('allows until capacity then rejects',()=>{let t=0; const l=new TokenBucketLimiter({capacity:2,refillPerSecond:1,now:()=>t}); assert.equal(l.take('a').allowed,true); assert.equal(l.take('a').allowed,true); const r=l.take('a'); assert.equal(r.allowed,false); assert.equal(r.retryAfterMs,1000);});
test('refills over time',()=>{let t=0; const l=new TokenBucketLimiter({capacity:1,refillPerSecond:2,now:()=>t}); l.take('a'); t=500; assert.equal(l.take('a').allowed,true);});
test('isolates keys',()=>{const l=new TokenBucketLimiter({capacity:1,refillPerSecond:1,now:()=>0}); l.take('a'); assert.equal(l.take('a').allowed,false); assert.equal(l.take('b').allowed,true);});
