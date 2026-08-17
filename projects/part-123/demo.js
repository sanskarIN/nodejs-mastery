import {TokenService,PolicyEngine,NonceGuard,AuditChain,redact,sha256,verifyArtifact} from './src/security.js';
const tokens=new TokenService({k2:'rotated-key'}); const token=tokens.sign({sub:'service-a',aud:'orders',scope:['read']},{kid:'k2',nowSec:100,ttlSec:60});
console.log('verified',tokens.verify(token,{aud:'orders',nowSec:120}));
const policy=new PolicyEngine([{match:i=>i.scope?.includes('read')&&i.resource==='order',effect:'allow'}]); console.log('policy',policy.decide({scope:['read'],resource:'order'}));
const nonce=new NonceGuard(); console.log('nonce',nonce.accept('n-1'),nonce.accept('n-1'));
const audit=new AuditChain(); audit.append('token_verified',{sub:'service-a'}); console.log('audit',audit.verify());
console.log('redacted',redact('user@example.com 123456789012'));
const h=sha256('release'); console.log('artifact',verifyArtifact({bytes:'release',expectedSha256:h}));
