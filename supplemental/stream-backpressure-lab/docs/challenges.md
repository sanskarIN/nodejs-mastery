# Challenges — Stream Backpressure Laboratory

1. Add a Transform that normalizes line endings without buffering the entire input.
2. Add a maximum total-byte budget and prove the pipeline aborts cleanly.
3. Create a deliberately slow Writable and measure that the producer does not grow memory without bound.
4. Add AbortSignal cancellation to a pipeline demonstration.
5. Extend the line framer to preserve multi-byte UTF-8 characters split across chunks.

Keep every buffering boundary explicit and tested.

Storefront: https://ramsandesh.gumroad.com
