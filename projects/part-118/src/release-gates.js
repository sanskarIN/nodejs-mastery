export const RELEASE_GATES = Object.freeze([
  'fixed-timestep','command-validation','authority','prediction-reconciliation','snapshot-integrity','delta-baseline','interest-management','bounded-lag-compensation','rollback-parity','anti-abuse','reconnect','epoch-fencing','regional-migration','observability-slo','recovery-runbook','audit-chain'
]);
export function evaluateRelease(evidence){return RELEASE_GATES.map(name=>({name,ok:evidence[name]===true}));}
export function releasePass(evidence){const checks=evaluateRelease(evidence);return{ok:checks.every(x=>x.ok),passed:checks.filter(x=>x.ok).length,total:checks.length,checks};}
