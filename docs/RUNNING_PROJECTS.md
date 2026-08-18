# Running the companion and supplemental projects

> 📘 Full eBook and explanations: https://ramsandesh.gumroad.com

Requirements: **Node.js 22+** and npm. Node.js 24 LTS is the repository's default local/release runtime.

## Select the pinned development runtime

```bash
nvm use
node --version
npm --version
```

## Inspect what is currently available

```bash
npm run projects
npm run supplemental
```

The numbered inventory is discovered dynamically from `projects/part-NNN/`. New post-series practice labs are discovered independently from `supplemental/`.

## Run every project's tests

```bash
npm test
```

Use `npm run test:parts` or `npm run test:supplemental` when you want one inventory only.

## Run all verification gates

```bash
npm run verify
```

## Run all demonstrations

```bash
npm run demo
```

## Run focused repository checks

```bash
npm run check:syntax
npm run check:json
npm run check:runtime
```

## Run all repository-policy checks

```bash
npm run check
```

This validates syntax, JSON, runtime support, repository structure, numbered-project metadata, supplemental-project policy, Gumroad visibility, SBOM integrity, evergreen link rules, isolation, sensitive files/secrets, and the public-code/commercial-book boundary.

## Run the complete release gate

```bash
npm run release:check
```

## Run one numbered project

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

## Run one supplemental project

```bash
cd supplemental/idempotent-api-kernel
npm test
npm run demo
npm run verify
```

Each lab remains independently runnable so learners can inspect one correctness boundary at a time. Supplemental projects are new educational extensions and must not be represented as recovered historical Part 1–125 companion archives.

See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md) for the maintained Node.js compatibility policy.

**Gumroad:** https://ramsandesh.gumroad.com
