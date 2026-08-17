# Command reference

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Run these commands from the repository root unless noted otherwise.

| Command | Purpose |
|---|---|
| `npm run projects` | Discover and list every `projects/part-NNN` companion lab |
| `npm test` | Run all available project test suites |
| `npm run demo` | Run all available project demonstrations |
| `npm run verify` | Run all chapter-specific executable verification gates |
| `npm run check:metadata` | Validate Node version, license, scripts, repo path, and Gumroad metadata |
| `npm run check:readmes` | Ensure every project README identifies its part and documents test/demo/verify commands |
| `npm run check:gumroad` | Verify the official storefront is present on public navigation surfaces |
| `npm run check:links` | Verify relative Markdown links resolve to repository files |
| `npm run check:isolation` | Reject relative source imports that escape one companion project into another |
| `npm run check:sensitive` | Reject credential-like files and private-key/container formats |
| `npm run check:boundary` | Reject paid-book artifact formats/names from the public repository |
| `npm run check` | Run root structural checks plus every repository policy check |
| `npm run release:check` | Run tests, verifiers, demos, and every repository policy check |

## One-project commands

```bash
cd projects/part-NNN
npm test
npm run demo
npm run verify
```

## Exit-code contract

Repository automation treats any non-zero child process exit as a failure. A runner never converts a failing companion project into a successful root command.

## Dynamic discovery

The root runner discovers `projects/part-NNN` directories at runtime. Adding a valid recovered project does not require editing a hardcoded array.

**Official storefront:** https://ramsandesh.gumroad.com
