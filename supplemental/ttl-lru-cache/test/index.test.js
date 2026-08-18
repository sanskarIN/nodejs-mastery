import test from 'node:test'; import assert from 'node:assert/strict'; import {TtlLruCache} from '../src/index.js';
test('expires entries by injected clock',()=>{let t=0; const c=new TtlLruCache({ttlMs:10,now:()=>t}); c.set('a',1); assert.equal(c.get('a'),1); t=10; assert.equal(c.get('a'),undefined);});
test('evicts least recently used entry',()=>{const c=new TtlLruCache({maxEntries:2,ttlMs:1000,now:()=>0}); c.set('a',1); c.set('b',2); c.get('a'); c.set('c',3); assert.equal(c.get('b'),undefined); assert.equal(c.get('a'),1); assert.equal(c.stats().evictions,1);});
test('tracks hits and misses',()=>{const c=new TtlLruCache({now:()=>0}); c.set('a',1); c.get('a'); c.get('x'); assert.deepEqual(c.stats(),{size:1,hits:1,misses:1,evictions:0});});
