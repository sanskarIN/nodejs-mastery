import test from 'node:test'; import assert from 'node:assert/strict';
import {TokenService,PolicyEngine,NonceGuard,SecretLease,RotationSet,AbuseLimiter,AuditChain,redact,sha256,verifyArtifact,constantTimeEqual} from '../src/security.js';

test('token signature, audience, expiry',()=>{const s=new TokenService({k1:'secret'});const t=s.sign({sub:'u1',aud:'api'},{nowSec:10,ttlSec:20});assert.equal(s.verify(t,{aud:'api',nowSec:15}).sub,'u1');assert.throws(()=>s.verify(t,{aud:'api',nowSec:30}));});
test('policy defaults to deny',()=>{const p=new PolicyEngine([{match:i=>i.role==='admin',effect:'allow'}]);assert.equal(p.decide({role:'user'}),'deny');assert.equal(p.decide({role:'admin'}),'allow');});
test('nonce replay is rejected',()=>{const n=new NonceGuard();assert.equal(n.accept('x'),true);assert.equal(n.accept('x'),false);});
test('secret leases expire',()=>{const s=new SecretLease({value:'v',expiresAt:100,version:2});assert.ok(s.usable(99));assert.equal(s.usable(100),false);});
test('rotation accepts active and previous only',()=>{const r=new RotationSet('v2','v1');assert.ok(r.accepts('v2'));assert.ok(r.accepts('v1'));assert.equal(r.accepts('v0'),false);});
test('abuse limiter enforces window capacity',()=>{const a=new AbuseLimiter({capacity:2,windowMs:10});assert.ok(a.allow('ip',0));assert.ok(a.allow('ip',1));assert.equal(a.allow('ip',2),false);assert.ok(a.allow('ip',20));});
test('audit chain detects tampering',()=>{const a=new AuditChain();a.append('login',{id:1});a.append('write',{id:2});assert.ok(a.verify());a.records[0].data.id=9;assert.equal(a.verify(),false);});
test('redaction removes obvious email and long account-like number',()=>{const r=redact('a@example.com 123456789012');assert.match(r,/\[email\]/);assert.match(r,/\[number\]/);});
test('artifact integrity uses sha256',()=>{const h=sha256('abc');assert.ok(verifyArtifact({bytes:'abc',expectedSha256:h}));assert.equal(verifyArtifact({bytes:'abcd',expectedSha256:h}),false);});
test('constant time equality checks content',()=>{assert.ok(constantTimeEqual('abc','abc'));assert.equal(constantTimeEqual('abc','abd'),false);assert.equal(constantTimeEqual('abc','ab'),false);});
