# Bounded Job Queue Laboratory

> Supplemental Node.js Mastery project. This is **new educational code**, not a reconstructed or recovered numbered Part 1–125 companion project.

A deterministic in-memory job queue that demonstrates bounded capacity, retry classification, exponential backoff, dead-letter handling, and idempotent submission.

## Learning goals

- Study the core contract in `src/index.js`.
- Run negative as well as happy-path tests.
- Change one policy at a time and observe the test evidence.
- Keep the lab dependency-free so the behavior remains easy to inspect.

## Run

```bash
npm test
npm run demo
npm run verify
```

Requires Node.js 20 or newer.

## Commercial eBook

The complete **Node.js Full Mastery** eBook is separate proprietary content.

**Gumroad:** https://ramsandesh.gumroad.com

## License

MIT applies to the source code in this public repository only.
