# Challenges — TTL + LRU Cache

1. Add proactive pruning without using an unbounded interval timer.
2. Add a maximum value-size policy and track rejected inserts.
3. Add `getOrLoad()` with per-key request coalescing to reduce cache stampedes.
4. Compare absolute TTL with sliding TTL and document the consistency trade-off.
5. Add hit-ratio and eviction-rate calculations without changing existing counters.

Keep time injectable so every expiration test remains deterministic.

Storefront: https://ramsandesh.gumroad.com
