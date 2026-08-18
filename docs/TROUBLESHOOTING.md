# Troubleshooting

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Wrong Node.js version

Check:

```bash
node --version
```

Use Node.js **22 or newer**. The repository pins Node.js **24 LTS** in `.nvmrc` and `.node-version` for common version managers. Run `npm run check:runtime` to diagnose runtime-policy drift.

## A root command reports one failed project

Run the failing lab directly:

```bash
cd projects/part-NNN
npm test
npm run demo
npm run verify
```

For a supplemental lab, use its directory under `supplemental/` instead. This usually provides a smaller and clearer failure surface.

## Syntax or JSON validation fails

Run the focused gate:

```bash
npm run check:syntax
npm run check:json
```

The syntax report identifies the exact JavaScript file that does not parse. The JSON report identifies the invalid package/configuration file.

## `npm run check` fails on metadata

Every available project must declare Node.js 22+, MIT for the public code, its repository directory, required scripts, and the official Gumroad homepage. Supplemental labs also enforce zero third-party dependencies and their documentation/image rules.

## Commercial-boundary check fails

Do not commit the paid PDF, DOCX, EPUB, master manuscript, source archive, or publication package to this public repository. Keep commercial publication files in private storage.

## CI passes locally but fails on GitHub

Compare both supported CI runtimes: Node.js 22 and Node.js 24. Also check line endings, case-sensitive paths, generated files, environment-dependent behavior, and whether your local runtime matches the pinned Node.js 24 line.

## A historical project is missing

Do not invent a replacement and label it as recovered. Update `docs/PROJECT_STATUS.md` only when an authentic archive is recovered or a reconstruction is explicitly identified as such.

## Reporting a bug

Use the GitHub bug-report template and include the project/part, Node.js version, command, expected result, actual result, and minimal reproduction. Add a regression test when practical.

See [`QUALITY_ASSURANCE.md`](QUALITY_ASSURANCE.md) for the complete bug-fix and release acceptance workflow.

**Book/storefront:** https://ramsandesh.gumroad.com
