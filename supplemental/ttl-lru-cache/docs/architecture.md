# Architecture — TTL + LRU Cache Laboratory

The cache uses Map insertion order as the LRU ordering. Reads refresh recency by deleting and re-inserting a live entry. Expiration is lazy and deterministic through an injected clock. This keeps the implementation small enough to inspect while still exposing real cache design trade-offs.

Storefront: https://ramsandesh.gumroad.com
