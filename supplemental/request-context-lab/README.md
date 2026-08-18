# Request Context Laboratory

> Supplemental Node.js Mastery project. This is **new educational code**, not a reconstructed or recovered numbered Part 1–125 companion project.

An `AsyncLocalStorage` laboratory for request-scoped context, correlation IDs, async propagation, and concurrent request isolation.

## Run

```bash
npm test
npm run demo
npm run verify
```

Requires Node.js 20 or newer and has no third-party dependencies.

## Learning focus

- Propagate stable request context through asynchronous call chains.
- Keep concurrent request contexts isolated.
- Fail clearly when code expects a context outside a request boundary.
- Keep sensitive values out of request-scoped diagnostic context.

## Commercial eBook

The complete **Node.js Full Mastery** eBook is separate proprietary content.

**Gumroad:** https://ramsandesh.gumroad.com

## License

MIT applies to the source code in this public repository only.
