# Architecture — Bounded Concurrency Pool

A fixed number of runner loops claim the next input index, execute one worker at a time, and write results back to the original index. This caps active asynchronous work while preserving deterministic result ordering.

The simple pool fails the overall call when a worker rejects. Already-started tasks may still finish because JavaScript promises are not automatically cancelled. Production callers that need cooperative cancellation should pass an `AbortSignal` into workers and define cleanup behavior explicitly.

Storefront: https://ramsandesh.gumroad.com
