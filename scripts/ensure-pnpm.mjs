const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.includes("pnpm/")) {
  console.error("This repository uses pnpm. Run `pnpm install` from the repo root.");
  process.exit(1);
}
