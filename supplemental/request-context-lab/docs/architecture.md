# Architecture — Request Context Laboratory

`AsyncLocalStorage` owns the asynchronous request scope. The stored context is intentionally small and immutable: stable correlation identifiers only, not credentials or large request bodies. The application creates a context at an ingress boundary and deeper code reads it without threading IDs through every function signature.

The lab does not claim that every third-party callback model preserves context automatically; production integrations should verify propagation across libraries, workers, queues, and process boundaries.

Storefront: https://ramsandesh.gumroad.com
