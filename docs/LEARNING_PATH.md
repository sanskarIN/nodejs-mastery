# Learning path

> 📘 Follow the complete 125-part curriculum in the eBook: https://ramsandesh.gumroad.com

The available public labs are mostly advanced companion material. If you are new to Node.js, begin with the book's foundations before jumping directly into distributed coordination, durable execution, event platforms, zero-trust security, or production capstones.

## Suggested public-lab order

1. **Part 77** — marketplace and financial correctness: money invariants, settlement and reconciliation.
2. **Part 84** — offline preference optimization concepts and deterministic evidence.
3. **Part 118** — server-authoritative real-time simulation and reconciliation.
4. **Part 119** — durable jobs, leases, retries, workflows, and compensation.
5. **Part 120** — partitioned event streaming, offsets, replay, and replication.
6. **Part 121** — distributed storage consistency, sharding, cache coherence, and regional fencing.
7. **Part 122** — resilient service/API platforms, budgets, bulkheads, canaries, and readiness.
8. **Part 123** — zero-trust identity, authorization, secrets, abuse control, and supply-chain integrity.
9. **Part 124** — observability, SLOs, performance, capacity, and cost signals.
10. **Part 125** — integrated production architecture and final executable mastery evidence.

## How to study each lab

For each part:

```bash
npm test
npm run demo
npm run verify
```

Then read the test cases and intentionally vary inputs to see which invariant rejects the change. Use [`TESTING.md`](TESTING.md) to understand the difference between a passing demo and production acceptance evidence.

## Repository map

See [`PROJECT_INDEX.md`](PROJECT_INDEX.md) for direct project paths and [`PROJECT_STATUS.md`](PROJECT_STATUS.md) for provenance.

The public repository does not reproduce missing foundational chapters. The **complete curriculum** remains available at **https://ramsandesh.gumroad.com**.
