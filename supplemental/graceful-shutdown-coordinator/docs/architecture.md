# Architecture — Graceful Shutdown Coordinator

The coordinator is a lifecycle kernel, not a signal handler. An application decides which operating-system or platform events start shutdown, then calls the coordinator exactly once from its boundary.

Hooks run in registration order so the application can stop admission before draining or closing shared dependencies. Failures are collected rather than aborting the remaining cleanup sequence. Production services should add explicit deadlines and forced termination outside this deterministic teaching kernel.

Storefront: https://ramsandesh.gumroad.com
