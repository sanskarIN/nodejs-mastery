# Running the companion projects

> 📘 Full eBook and explanations: https://ramsandesh.gumroad.com

Requirements: **Node.js 20+** and npm.

## Inspect what is currently available

```bash
npm run projects
```

The inventory is discovered dynamically from `projects/part-NNN/` directories.

## Run every project's tests

```bash
npm test
```

## Run all verification gates

```bash
npm run verify
```

## Run all demonstrations

```bash
npm run demo
```

## Run repository-policy checks

```bash
npm run check
```

This verifies repository structure, project metadata, Gumroad visibility, and the public-code/commercial-book boundary.

## Run the complete release gate

```bash
npm run release:check
```

## Run one project

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

Each part remains independently runnable so learners can inspect one correctness boundary at a time. No project should require implementation code from another part unless that dependency is explicitly documented in a future architecture revision.

**Gumroad:** https://ramsandesh.gumroad.com
