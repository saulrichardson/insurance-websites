# Documentation

This directory contains portfolio-level context for `insurance-websites`.

## Read Order

1. `../AGENTS.md`
2. `product-intent.md`
3. `approach.md`
4. `records/README.md`
5. relevant app docs under `../apps/<site>/docs/`
6. nearby code, tests, configs, data, and deployment files

## Model

Use `product-intent.md` for the portfolio north star: what the insurance website system should make possible across agency sites.

Use `approach.md` for the current monorepo operating model: how apps are organized, where important behavior lives, what stack is in use, what constraints matter, and how work is verified and delivered.

Use `records/` for durable memory: decisions, caveats, lessons, risks, tradeoffs, stack rationale, and operating notes that future agents should understand.

Use each app's `docs/` folder for website-specific product direction and implementation notes. Do not create nested `AGENTS.md` files.

## Practical Rule

- Portfolio product goal: `product-intent.md`
- Repo architecture and operating model: `approach.md`
- Rationale, history, caveats, or lessons: `records/`
- Site-specific product intent: `../apps/<site>/docs/product-intent.md`
- Site-specific stack, routes, deployment, and verification: `../apps/<site>/docs/approach.md`
- Agent behavior and working rules: `../AGENTS.md`
