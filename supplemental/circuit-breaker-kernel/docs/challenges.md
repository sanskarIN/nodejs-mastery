# Challenges — Circuit Breaker Kernel

1. Classify which errors should count toward the breaker threshold.
2. Replace consecutive failures with a bounded rolling failure-rate window.
3. Add metrics for rejected calls, state transitions, probe outcomes, and open duration.
4. Bound half-open concurrency to more than one probe while preventing a thundering herd.
5. Compose the breaker with deadlines and retry budgets and prove retries do not multiply overload.

Keep the breaker scoped to one dependency/failure domain rather than one global switch.

Storefront: https://ramsandesh.gumroad.com
