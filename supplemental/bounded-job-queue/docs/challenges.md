# Challenges — Bounded Job Queue

1. Add deterministic jitter to retry delays and prove the bound in tests.
2. Add separate retry budgets per job kind without allowing one class to starve another.
3. Model an explicit `running` state and reject concurrent execution of the same job ID.
4. Add a bounded dead-letter retention policy and expose eviction metrics.
5. Design a durable-storage adapter interface without coupling the queue kernel to a database.

For every change, add negative tests and preserve duplicate-submission safety.

Storefront: https://ramsandesh.gumroad.com
