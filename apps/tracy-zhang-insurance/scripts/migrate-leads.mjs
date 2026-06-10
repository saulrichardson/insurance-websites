import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const schemaPath = join(appRoot, "sql", "leads.sql");
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  console.error("DATABASE_URL is required to run the lead migration.");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  max: 1,
  ssl: databaseUrl.includes("localhost") ? false : "require",
});

try {
  const schema = await readFile(schemaPath, "utf8");
  await sql.unsafe(schema);
  console.log("Lead database schema is ready.");
} finally {
  await sql.end();
}
