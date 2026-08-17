# Dependency policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The currently published companion laboratories intentionally rely on Node.js built-ins and declare no third-party npm dependencies. This keeps each educational example portable, reviewable, and easy to archive.

## Policy

`config/dependency-policy.json` is the explicit dependency allowlist for the repository.

A dependency may be introduced only when:

1. it materially improves the educational or verification value;
2. the same goal would be unreasonable or misleading with Node.js built-ins;
3. its license is compatible with the public repository's distribution model;
4. its security and maintenance posture has been reviewed;
5. the exact package name is added to the appropriate allowlist in the same reviewed change;
6. tests and documentation cover the new dependency boundary.

## Enforcement

```bash
npm run check:dependencies
```

The check scans root and project `package.json` files across dependency, development, optional, and peer dependency fields. A package that is declared but not allowlisted fails the repository gate. An allowlist entry that is no longer declared also fails so stale approvals do not accumulate.

## GitHub automation

Dependabot remains configured so that if approved dependencies are introduced later, update proposals can be surfaced automatically. Pull requests also run dependency review.

## Why explicit allowlisting?

Educational repositories benefit from a small dependency surface: fewer install failures, fewer supply-chain assumptions, clearer examples, and easier long-term reproduction. The policy does not prohibit dependencies forever; it makes their introduction deliberate.

**Official storefront:** https://ramsandesh.gumroad.com
