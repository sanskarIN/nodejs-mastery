# Challenges — Service Health Kernel

1. Add optional dependencies that affect diagnostics but not readiness.
2. Add startup readiness with an explicit warm-up deadline.
3. Model graceful shutdown phases: stop admission, drain in-flight work, close dependencies.
4. Add dependency freshness timestamps and stale-health rejection.
5. Produce a machine-readable readiness explanation suitable for an HTTP handler.

Never make liveness fail merely because a downstream dependency is unavailable.

Storefront: https://ramsandesh.gumroad.com
