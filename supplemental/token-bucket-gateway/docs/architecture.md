# Architecture — Token Bucket Gateway Laboratory

Each key owns an independent bucket. Refill is continuous rather than interval-based, which avoids timer management and makes tests deterministic. Production systems still need bounded key cardinality, distributed coordination when multiple replicas share a quota, and explicit identity choices for the rate-limit key.

Storefront: https://ramsandesh.gumroad.com
