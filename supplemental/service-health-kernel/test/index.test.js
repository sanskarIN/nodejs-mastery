import test from 'node:test'; import assert from 'node:assert/strict'; import {ServiceHealth} from '../src/index.js';
test('liveness does not depend on downstream readiness',()=>{const h=new ServiceHealth(['db']); assert.equal(h.liveness().ok,true); assert.equal(h.readiness().ok,false);});
test('becomes ready when required dependencies are healthy',()=>{const h=new ServiceHealth(['db','cache']); h.setDependency('db',true); h.setDependency('cache',true); assert.deepEqual(h.readiness(),{ok:true,status:200,draining:false,missing:[]});});
test('draining removes readiness but not liveness',()=>{const h=new ServiceHealth([]); h.beginDrain(); assert.equal(h.readiness().status,503); assert.equal(h.liveness().status,200);});
