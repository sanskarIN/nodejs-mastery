# Challenges — Idempotent Event Consumer

1. Add a bounded deduplication window and document replay implications.
2. Model retryable versus poison failures without advancing committed offsets too early.
3. Add per-partition lag calculations from a supplied high-water mark.
4. Add deterministic batch processing while preserving per-partition ordering.
5. Design a durable offset-store interface and define crash points around handler success and commit.

Keep partition ownership and offset advancement explicit in every test.

Storefront: https://ramsandesh.gumroad.com
