import postgres from "postgres";

type SqlClient = ReturnType<typeof postgres>;

declare global {
  var __san_marino_sql: SqlClient | undefined;
}

export function getSql() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  if (!globalThis.__san_marino_sql) {
    let ssl: false | "require" = "require";
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") ssl = false;
    } catch {
      // If DATABASE_URL isn't parseable as a URL, keep ssl=require by default.
    }

    globalThis.__san_marino_sql = postgres(url, {
      // Keep a small pool for serverless environments.
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl,
    });
  }

  return globalThis.__san_marino_sql;
}
