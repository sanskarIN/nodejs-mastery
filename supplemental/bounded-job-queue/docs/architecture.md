# Architecture — Bounded Job Queue Laboratory

The queue models four explicit states: pending, completed, retry-delayed, and dead-letter. Capacity is checked before admission, retry delays grow exponentially, and duplicate job IDs are rejected. The laboratory intentionally keeps persistence out of scope so learners can focus on the queue contract before introducing a database or message broker.

Storefront: https://ramsandesh.gumroad.com
