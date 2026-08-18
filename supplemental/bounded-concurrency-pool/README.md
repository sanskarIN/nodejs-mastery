# Bounded Concurrency Pool Laboratory

> Supplemental Node.js Mastery project. This is **new educational code**, not a reconstructed or recovered numbered Part 1–125 companion project.

A dependency-free concurrency mapper that caps active work, preserves input/result ordering, exposes peak concurrency, and propagates task failures.

## Run

```bash
npm test
npm run demo
npm run verify
```

Requires Node.js 20 or newer and has no third-party dependencies.

## Learning focus

- Bound parallel asynchronous work instead of firing everything at once.
- Preserve deterministic result ordering even when tasks finish out of order.
- Observe actual peak concurrency in tests.
- Treat concurrency limits as resource policies, not performance decorations.

## Commercial eBook

**Gumroad:** https://ramsandesh.gumroad.com

## License

MIT applies to public repository source code only.
