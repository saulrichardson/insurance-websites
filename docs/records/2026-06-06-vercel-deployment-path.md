# Vercel Deployment Path For Tracy Zhang Insurance

- date: 2026-06-06

## Context

`tracyzhanginsurance.com` and `sanmarinoinsurance.com` returned production 500
responses with `MIDDLEWARE_INVOCATION_FAILED`. Vercel logs showed the deployed
edge proxy could not resolve `react` from the generated middleware bundle.

Removing the proxy fixed the local/prebuilt middleware artifact, but the nested
monorepo prebuilt deploy path still failed with pnpm workspace tracing issues.
Source deploying directly from the nested app also failed because Vercel used
`npm install` when the upload did not include the root pnpm workspace files.

## Record

Deploy `apps/tracy-zhang-insurance` to Vercel as a staged root-level pnpm Next
project.

Use `scripts/stage-tracy-zhang-insurance-vercel.mjs` to create a temporary
deploy root containing:

- the canonical app at the temporary root
- `packages/domain`, `packages/lead-capture`, and `packages/ui`
- a minimal `pnpm-workspace.yaml`
- the root `pnpm-lock.yaml`, package manager, Node engine, and pnpm settings
- a `.vercelignore` that excludes local build and install artifacts
- the existing Vercel project link when available

The staging script derives a staged lockfile offline for the app-at-root package
shape. Then run a frozen install, build, and production deploy from that staged
directory. This lets Vercel install the staged workspace with pnpm without
resolving new dependency versions during deploy.

Do not rely on the nested-app prebuilt deploy path for this app until Vercel's
Next local builder handles pnpm workspace traces and middleware/proxy bundles
reliably.

## Evidence

- The broken production deployment was
  `san-marino-insurance-fhrukq9pe-saulrichardsons-projects.vercel.app`.
- `curl -I https://tracyzhanginsurance.com` returned HTTP 500 with
  `x-vercel-error: MIDDLEWARE_INVOCATION_FAILED`.
- Vercel logs showed `Cannot find module 'react'` from
  `.next/server/middleware.js`.
- `vercel deploy --prebuilt` from the nested app failed when traced pnpm files
  were outside the uploaded output.
- `vercel deploy` from the nested app failed because the remote build used
  `npm install`.
- Staging the app as a root-level pnpm project produced production deployment
  `san-marino-insurance-f42qqcxrb-saulrichardsons-projects.vercel.app`.
- Live smoke checks after that deployment returned HTTP 200 for
  `tracyzhanginsurance.com`, `www.tracyzhanginsurance.com`, and
  `sanmarinoinsurance.com`.

## Future Guidance

Keep the public app off Next middleware/proxy unless there is a strong reason
and the deployed output is verified on Vercel. Keep admin authorization in
server-side page/action code. For production deploys, prefer the staged pnpm
source deploy until the Vercel project is reconfigured to support the monorepo
directly or the local builder behavior changes.
