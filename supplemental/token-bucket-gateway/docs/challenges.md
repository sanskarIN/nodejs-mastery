# Challenges — Token Bucket Gateway

1. Add bounded idle-bucket cleanup and prove active clients are not evicted.
2. Support different costs per operation while preserving the capacity invariant.
3. Add a deterministic burst policy distinct from steady refill rate.
4. Design a shared-store interface for multi-replica quotas and describe clock/race risks.
5. Emit stable rate-limit headers from the limiter result without exposing internal precision.

Keep client identity selection explicit; do not hide it inside the limiter.

Storefront: https://ramsandesh.gumroad.com
