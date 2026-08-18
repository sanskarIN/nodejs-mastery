# Graceful Shutdown Coordinator Laboratory

> Supplemental Node.js Mastery project. This is **new educational code**, not a reconstructed or recovered numbered Part 1–125 companion project.

A deterministic lifecycle coordinator for ordered shutdown hooks, idempotent repeated shutdown calls, failure collection, and explicit state transitions.

## Run

```bash
npm test
npm run demo
npm run verify
```

Requires Node.js 22 or newer; Node.js 24 LTS is recommended. The lab has no third-party dependencies.

## Learning focus

- Stop accepting new work before closing shared dependencies.
- Make repeated shutdown signals idempotent.
- Preserve cleanup evidence even when one hook fails.
- Keep process signal wiring outside the reusable lifecycle kernel.

## Commercial eBook

The complete **Node.js Full Mastery** eBook is separate proprietary content.

**Gumroad:** https://ramsandesh.gumroad.com

## License

MIT applies to the source code in this public repository only.
