# Command reference

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Run these commands from the repository root unless noted otherwise.

| Command | Purpose |
|---|---|
| `npm run projects` | Discover and list every `projects/part-NNN` numbered companion lab |
| `npm run supplemental` | Discover and list every new project under `supplemental/` |
| `npm run test:parts` | Test numbered companion projects only |
| `npm run test:supplemental` | Test supplemental projects only |
| `npm test` | Test numbered and supplemental projects |
| `npm run demo:parts` | Run numbered project demonstrations only |
| `npm run demo:supplemental` | Run supplemental demonstrations only |
| `npm run demo` | Run every demonstration |
| `npm run verify:parts` | Run numbered project verification gates only |
| `npm run verify:supplemental` | Run supplemental verification gates only |
| `npm run verify` | Run every verification gate |
| `npm run sbom` | Generate the CycloneDX 1.5 SBOM for numbered + supplemental public code |
| `npm run check:dependencies` | Enforce numbered-project npm dependency allowlists |
| `npm run check:metadata` | Validate numbered project Node/license/repo/Gumroad metadata |
| `npm run check:readmes` | Validate numbered project README contracts |
| `npm run check:supplemental` | Validate supplemental metadata, zero-dependency policy, docs, Gumroad, and evergreen-link policy |
| `npm run check:gumroad` | Verify the official storefront is present on public navigation surfaces |
| `npm run check:links` | Verify relative Markdown links resolve to repository files |
| `npm run check:isolation` | Reject relative source imports that escape one numbered companion project into another |
| `npm run check:sensitive` | Reject credential-like files and private-key/container formats |
| `npm run check:secrets` | Scan tracked text for high-confidence private-key and provider-token patterns |
| `npm run check:sbom` | Generate and structurally validate the public-code SBOM |
| `npm run check:boundary` | Reject paid-book artifact formats/names from the public repository |
| `npm run check` | Run root structural checks plus every repository policy check |
| `npm run release:check` | Run tests, verifiers, demos, policy checks, secret scanning, and SBOM validation |

## One-project commands

Numbered project:

```bash
cd projects/part-NNN
npm test
npm run demo
npm run verify
```

Supplemental project:

```bash
cd supplemental/bounded-job-queue
npm test
npm run demo
npm run verify
```

## Exit-code contract

Repository automation treats any non-zero child-process exit as a failure. A runner never converts a failing project into a successful root command.

## Dynamic discovery

The numbered runner discovers `projects/part-NNN` directories at runtime. The supplemental runner independently discovers direct child directories under `supplemental/`. Neither inventory is maintained as a hardcoded execution list.

**Official storefront:** https://ramsandesh.gumroad.com
