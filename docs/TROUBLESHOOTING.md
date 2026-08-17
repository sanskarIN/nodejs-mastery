# Troubleshooting

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Wrong Node.js version

Check:

```bash
node --version
```

Use Node.js 20 or newer. The repository includes `.nvmrc` and `.node-version` files for common version managers.

## A root command reports one failed project

Run the failing part directly:

```bash
cd projects/part-NNN
npm test
npm run demo
npm run verify
```

This usually provides a smaller and clearer failure surface.

## `npm run check` fails on metadata

Every available project must declare Node.js 20+, MIT for the public code, its repository directory, required scripts, and the official Gumroad homepage.

## Commercial-boundary check fails

Do not commit the paid PDF, DOCX, EPUB, master manuscript, or publication package to this public repository. Keep commercial publication files in private storage.

## CI passes locally but fails on GitHub

Compare both supported CI runtimes: Node.js 20 and Node.js 22. Also check line endings, case-sensitive paths, generated files, and environment-dependent behavior.

## A historical project is missing

Do not invent a replacement and label it as recovered. Update `docs/PROJECT_STATUS.md` only when an authentic archive is recovered or a reconstruction is explicitly identified as such.

## Reporting a bug

Use the GitHub bug-report template and include the part number, Node.js version, command, expected result, actual result, and minimal reproduction.

**Book/storefront:** https://ramsandesh.gumroad.com
