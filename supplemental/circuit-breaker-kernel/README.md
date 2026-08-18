# Circuit Breaker Kernel Laboratory

> Supplemental Node.js Mastery project. This is **new educational code**, not a reconstructed or recovered numbered Part 1–125 companion project.

A deterministic closed/open/half-open circuit breaker with failure thresholds, cooldown timing, and a single recovery probe.

## Run

```bash
npm test
npm run demo
npm run verify
```

Requires Node.js 22 or newer; Node.js 24 LTS is recommended. The lab has no third-party dependencies.

## Learning focus

- Distinguish application failure from breaker rejection.
- Open only after a defined consecutive-failure threshold.
- Permit a controlled half-open recovery probe after cooldown.
- Close and reset failure history only after a successful probe.

## Commercial eBook

**Gumroad:** https://ramsandesh.gumroad.com

## License

MIT applies to public repository source code only.
