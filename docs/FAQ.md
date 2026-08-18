# Frequently asked questions

> 📘 **Complete Node.js Full Mastery:** https://ramsandesh.gumroad.com

## Is the complete eBook open source?

No. The public companion source code is MIT-licensed. The complete commercial eBook and publication assets remain Copyright © 2026 Ram Sandesh. All rights reserved.

## Why are only some companion parts available?

The public repository contains the companion archives that were actually recovered or explicitly reconstructed and verified. Missing historical archives are not silently replaced with invented code.

## Which Node.js version should I use?

Use Node.js **22 or newer**. Node.js 24 LTS is the pinned development/release runtime, and required CI validates Node.js 22 and 24. See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md).

## Do I need to install dependencies?

The currently published labs are intentionally dependency-free or use only built-in Node.js capabilities. Run the commands shown in each project's README.

## What is the difference between `test`, `demo`, and `verify`?

- `test` checks correctness invariants.
- `demo` illustrates the modeled behavior.
- `verify` checks the executable evidence expected by the part or supplemental lab.

## How do I perform the strongest repository check?

Run `npm run release:check`. It executes all project tests, verification gates, demos, and the full repository quality/security/policy suite. See [`QUALITY_ASSURANCE.md`](QUALITY_ASSURANCE.md).

## Can I use the companion code commercially?

The MIT License permits broad software reuse subject to its terms. The commercial eBook is a separate proprietary work and is not covered by that permission.

## Can I redistribute the paid book from this repository?

No. The public repository intentionally excludes the commercial manuscript and publication files.

## Where can I get the full curriculum?

The official storefront is **https://ramsandesh.gumroad.com**.
