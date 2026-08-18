<p align="center">
  <a href="https://ramsandesh.gumroad.com"><img src="../../assets/gumroad-storefront-badge.svg" alt="Get Node.js Full Mastery on Gumroad" width="680"></a>
</p>

> 📘 **Complete Node.js Full Mastery eBook:** **https://ramsandesh.gumroad.com**

# Node.js Full Mastery - Part 120 Companion Project

A dependency-free Node.js 22+ laboratory for the contracts behind durable event streaming and partitioned event platforms.

**Runtime:** Node.js 22+; Node.js 24 LTS is recommended.

## What it models

- append-only topics and partitions with monotonically increasing offsets
- deterministic key-to-partition routing
- producer identity, producer sequence, and duplicate suppression
- event envelopes with schema/version metadata and integrity hashes
- consumer groups, assignments, committed offsets, rebalance generations, and stale-generation fencing
- at-least-once delivery with idempotent effects
- projection checkpoints and rebuilds
- log compaction by record key plus retention floors
- change-data-capture envelopes
- replica frontier checks and hash verification
- privacy-safe metrics and a tamper-evident audit chain

The storage is intentionally in memory so the contracts remain readable. Production systems need durable replicated storage, authentication/authorization, encryption, quotas, tested migrations, backup/restore, and operational controls.

## Commands

```bash
npm test
npm run demo
npm run verify
```

---

📚 **Node.js Full Mastery — 125-part commercial edition:** https://ramsandesh.gumroad.com
