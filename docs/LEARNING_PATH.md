# Learning path

> 📘 Follow the complete 125-part curriculum in the eBook: https://ramsandesh.gumroad.com

The available numbered public labs are mostly advanced companion material. If you are new to Node.js, begin with the book's foundations before jumping directly into distributed coordination, durable execution, event platforms, zero-trust security, or production capstones.

## Suggested numbered-lab order

1. **Part 77** — marketplace and financial correctness.
2. **Part 84** — offline preference optimization concepts and deterministic evidence.
3. **Part 118** — server-authoritative real-time simulation and reconciliation.
4. **Part 119** — durable jobs, leases, retries, workflows, and compensation.
5. **Part 120** — partitioned event streaming, offsets, replay, and replication.
6. **Part 121** — distributed storage consistency, sharding, cache coherence, and regional fencing.
7. **Part 122** — resilient service/API platforms, budgets, bulkheads, canaries, and readiness.
8. **Part 123** — zero-trust identity, authorization, secrets, abuse control, and supply-chain integrity.
9. **Part 124** — observability, SLOs, performance, capacity, and cost signals.
10. **Part 125** — integrated production architecture and final executable mastery evidence.

## Suggested supplemental-lab order

After you are comfortable with the foundations, the new supplemental projects can be used as smaller focused drills:

1. `config-redaction-kit` — configuration validation and safe diagnostics.
2. `ttl-lru-cache` — cache bounds, TTL and eviction.
3. `token-bucket-gateway` — request admission and quota math.
4. `stream-backpressure-lab` — bounded streaming and error propagation.
5. `service-health-kernel` — liveness, readiness and graceful draining.
6. `bounded-job-queue` — retries, backoff and dead letters.
7. `idempotent-api-kernel` — replay-safe external effects.
8. `event-consumer-kernel` — offsets, duplicate suppression and poison events.

These are new post-series labs rather than replacements for missing historical companion archives.

## How to study each lab

For any project:

```bash
npm test
npm run demo
npm run verify
```

Then read the test cases and intentionally vary inputs to see which invariant rejects the change. Use [`TESTING.md`](TESTING.md) to understand the difference between a passing demo and production acceptance evidence.

## Repository map

See [`PROJECT_INDEX.md`](PROJECT_INDEX.md), [`SUPPLEMENTAL_PROJECTS.md`](SUPPLEMENTAL_PROJECTS.md), and [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

The public repository does not reproduce missing foundational chapters. The **complete curriculum** remains available at **https://ramsandesh.gumroad.com**.
