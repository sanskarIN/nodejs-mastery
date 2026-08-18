# Architecture — Idempotent Event Consumer Laboratory

Offsets are tracked per partition and only advance after the handler succeeds. Duplicate or old offsets are ignored. Poison events are quarantined without advancing the partition offset, making the consequence visible. A real broker integration would add durable offset commits, retry scheduling, ordering rules, and bounded deduplication storage.

Storefront: https://ramsandesh.gumroad.com
