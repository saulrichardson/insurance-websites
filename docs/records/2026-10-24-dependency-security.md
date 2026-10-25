# Dependency security update

- date: 2026-10-24

GitHub dependency alerts identified critical Next.js vulnerabilities in both
applications and additional issues in the build/test dependency tree. Both apps
now use Next.js 16.4.3 and React 19.3.1, with matching shared UI peer versions.
Vitest 5.0.5, Vite 8.3.5, the PostCSS 8.5.23 override, and a regenerated pnpm
lockfile remove the remaining audit findings.

The advisor structured-data test uses a shape assertion so its runtime checks
also type-check against the heterogeneous JSON-LD graph. It still verifies the
ProfilePage's mainEntity and about links to the person.

Keep the root pnpm lockfile as the install source of truth. Verify with pnpm
audit, hygiene:check, lint, test, and both production builds before deployment.
