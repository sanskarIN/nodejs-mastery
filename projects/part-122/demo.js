import {CircuitBreaker,RetryBudget,ServiceRegistry,CanaryRouter,IdempotencyStore} from './src/platform.js';
const registry=new ServiceRegistry(); registry.upsert('catalog',{id:'cat-a',ready:true}); registry.upsert('catalog',{id:'cat-b',ready:true});
const budget=new RetryBudget({capacity:2,refillPerSecond:0}); const breaker=new CircuitBreaker({failureThreshold:2,openMs:100});
console.log('chosen',registry.choose('catalog','sku-42'));
console.log('retry tokens',budget.take(0),budget.take(0),budget.take(0));
breaker.failure(0); breaker.failure(1); console.log('breaker allows while open?',breaker.allow(2));
const route=new CanaryRouter({percent:25}); console.log('release route',route.route('request-42'));
const idem=new IdempotencyStore(); console.log(idem.execute('order:42',()=>({accepted:true}))); console.log(idem.execute('order:42',()=>({accepted:false})));
