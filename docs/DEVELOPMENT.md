# Local development

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Requirements

- Git
- Node.js 20 or newer
- npm bundled with your Node.js installation

The repository includes `.nvmrc` and `.node-version` with the primary development line.

## Clone and verify

```bash
git clone https://github.com/sanskarIN/nodejs-mastery.git
cd nodejs-mastery
node --version
npm run projects
npm test
npm run verify
npm run check
```

## Maintainer Git identity

Maintainer commits use:

```bash
git config user.name "Sanskar"
git config user.email "sanskarin@outlook.in"
```

## Work on one part

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

## Before proposing a change

Return to the repository root and run:

```bash
npm run release:check
```

A behavior fix should normally include a regression test. A project-recovery change should also update provenance in `PROJECT_STATUS.md`.

## What not to commit

Do not add secrets, credentials, customer data, generated dependency folders, or the commercial PDF/DOCX/EPUB/publication package.

**Book/storefront:** https://ramsandesh.gumroad.com
