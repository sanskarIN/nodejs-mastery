import test from 'node:test'; import assert from 'node:assert/strict'; import {loadConfig,redact,safeEnvSnapshot} from '../src/index.js';
test('loads bounded config',()=>{assert.deepEqual(loadConfig({SERVICE_NAME:'api',PORT:'8080',NODE_ENV:'test'}),{serviceName:'api',port:8080,mode:'test',databaseUrl:null});});
test('rejects invalid ports',()=>{assert.throws(()=>loadConfig({SERVICE_NAME:'api',PORT:'99999'}),/PORT/);});
test('redacts nested secret-like fields',()=>{assert.deepEqual(redact({token:'x',nested:{password:'y',ok:1}}),{token:'[REDACTED]',nested:{password:'[REDACTED]',ok:1}});});
test('safe snapshot filters unrelated env',()=>{assert.deepEqual(safeEnvSnapshot({SERVICE_NAME:'x',API_TOKEN:'secret',HOME:'/tmp'}),{SERVICE_NAME:'x',API_TOKEN:'[REDACTED]'});});
