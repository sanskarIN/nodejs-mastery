# Challenges — Idempotent API Kernel

1. Model concurrent in-flight requests using the same idempotency key.
2. Add explicit result status codes and response metadata without rerunning the effect.
3. Canonicalize request fingerprints so object key ordering does not create false conflicts.
4. Add a bounded retention/eviction policy with metrics.
5. Design a durable adapter and define what happens when the effect succeeds but record persistence fails.

Treat ambiguity around the external effect as a first-class failure mode.

Storefront: https://ramsandesh.gumroad.com
