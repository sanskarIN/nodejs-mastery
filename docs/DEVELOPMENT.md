# Local development

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Requirements

- Git
- Node.js 22 or newer
- npm bundled with your Node.js installation

The repository pins **Node.js 24 LTS** in `.nvmrc` and `.node-version` for normal development and release-readiness work.

## Clone and verify

```bash
git clone https://github.com/sanskarIN/nodejs-mastery.git
cd nodejs-mastery
nvm use
node --version
npm --version
npm run projects
npm run supplemental
npm run release:check
```

If you do not use nvm, install a maintained Node.js 22+ runtime and prefer Node.js 24 for parity with the release workflow.

## Maintainer Git identity

Maintainer commits use:

```bash
git config user.name "Sanskar"
git config user.email "sanskarin@outlook.in"
```

## Work on one numbered part

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

## Work on one supplemental lab

```bash
cd supplemental/request-context-lab
npm test
npm run demo
npm run verify
```

## Before proposing a change

Return to the repository root and run:

```bash
npm run release:check
```

For faster diagnosis you can run `npm run check:syntax`, `npm run check:json`, or `npm run check:runtime` independently.

A behavior fix should normally include a regression test. A project-recovery change should also update provenance in `PROJECT_STATUS.md`.

## What not to commit

Do not add secrets, credentials, customer data, generated dependency folders, or the commercial PDF/DOCX/EPUB/publication package.

See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md) for supported Node.js lines.

**Book/storefront:** https://ramsandesh.gumroad.com
