# Challenges — Request Context Laboratory

1. Add a safe `userId` field while proving credentials never enter the context object.
2. Add a logger helper that automatically includes request/trace IDs without mutating log payloads.
3. Test context propagation through timers, promises, event emitters, and a small HTTP request handler.
4. Demonstrate that worker threads and child processes need explicit context transfer.
5. Add a context-size policy and reject oversized metadata.

Keep correlation context small, stable, and free of secrets.

Storefront: https://ramsandesh.gumroad.com
