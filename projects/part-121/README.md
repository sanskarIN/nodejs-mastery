<p align="center">
  <a href="https://ramsandesh.gumroad.com"><img src="../../assets/gumroad-storefront-badge.svg" alt="Get Node.js Full Mastery on Gumroad" width="680"></a>
</p>

> 📘 **Complete Node.js Full Mastery eBook:** **https://ramsandesh.gumroad.com**

# Node.js Full Mastery - Part 121 Companion Lab

A dependency-free Node.js 22+ educational laboratory for distributed data consistency and scalable storage architecture.

**Runtime:** Node.js 22+; Node.js 24 LTS is recommended.

## What it models
- bounded connection pools and acquisition timeout
- versioned rows and optimistic concurrency
- transaction snapshots and conflict detection
- lock ownership and deadlock-cycle detection
- read-replica frontiers and bounded-staleness reads
- range sharding, routing epochs, and reshard cutover
- version-aware cache coherence and write-behind queues
- distributed uniqueness reservations
- atomic business-state + outbox intent
- checksummed backups and restore validation
- multi-region ownership epochs and stale-writer fencing
- tamper-evident audit evidence and release gates

## Run
```bash
npm test
npm run demo
npm run verify
```

The code keeps state in memory so the invariants are visible. Production systems must move these contracts into durable databases, coordinators, cache platforms, backup systems, and identity-aware control planes.

---

📚 **Node.js Full Mastery — 125-part commercial edition:** https://ramsandesh.gumroad.com
