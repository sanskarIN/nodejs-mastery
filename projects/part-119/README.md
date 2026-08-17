<p align="center">
  <a href="https://ramsandesh.gumroad.com"><img src="../../assets/gumroad-storefront-badge.svg" alt="Get Node.js Full Mastery on Gumroad" width="680"></a>
</p>

> 📘 **Complete Node.js Full Mastery eBook:** **https://ramsandesh.gumroad.com**

# Node.js Full Mastery - Part 119 Companion Lab

Dependency-free Node.js 20+ laboratory for **Durable Background Execution and Distributed Workflow Orchestration**.

## Run

```bash
npm test
npm run demo
npm run verify
```

## What it demonstrates

- idempotent job admission using idempotency keys
- explicit waiting, leased, succeeded, and dead-letter states
- visibility leases with fencing tokens against stale workers
- bounded exponential retry with deterministic jitter
- dead-letter replay
- worker execution and handler routing
- recurring schedule catch-up without an unbounded burst
- token-bucket quota control
- inbox duplicate suppression and an outbox staging model
- durable workflow concepts: state machines, signals, history, and compensation paths
- tamper-evident audit-chain verification

The implementation is intentionally small and in-memory so the contracts are visible. A production system would place queue rows, workflow history, idempotency records, ownership epochs, and outbox/inbox records in durable storage with transactional guarantees appropriate to the application.

---

📚 **Node.js Full Mastery — 125-part commercial edition:** https://ramsandesh.gumroad.com
