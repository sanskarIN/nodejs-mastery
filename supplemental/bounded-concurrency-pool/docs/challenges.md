# Challenges — Bounded Concurrency Pool

1. Add cooperative cancellation with `AbortSignal`.
2. Add an ordered `allSettled` mode that records failures without aborting the whole batch.
3. Add per-task deadlines without leaking timers.
4. Add a bounded input queue for an async iterable rather than materializing all items first.
5. Record task latency and queue-wait histograms while keeping metric cardinality bounded.

Choose concurrency from resource limits and dependency capacity rather than from an arbitrary large number.

Storefront: https://ramsandesh.gumroad.com
