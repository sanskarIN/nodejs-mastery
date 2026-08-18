# Challenges — Graceful Shutdown Coordinator

1. Add a global shutdown deadline with deterministic timeout tests.
2. Add per-hook time budgets without letting one hook consume the whole window.
3. Separate stop-admission, drain, and close-resource phases.
4. Add signal wiring for `SIGTERM` and `SIGINT` in a tiny example application.
5. Produce structured shutdown evidence containing durations and failures.

Keep repeated shutdown signals idempotent and never skip remaining cleanup only because one hook failed.

Storefront: https://ramsandesh.gumroad.com
