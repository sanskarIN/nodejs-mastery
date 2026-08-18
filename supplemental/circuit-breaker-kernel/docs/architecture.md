# Architecture — Circuit Breaker Kernel

The breaker starts closed and counts consecutive action failures. Crossing the threshold opens the circuit and rejects new work until the injected clock reaches the cooldown. The next allowed call becomes a half-open probe: success closes and resets the breaker, while failure opens it again.

Production breakers should also define failure classification, rolling windows, metrics, per-dependency ownership, probe concurrency, and interactions with retries/timeouts. This lab keeps the state machine intentionally small and deterministic.

Storefront: https://ramsandesh.gumroad.com
