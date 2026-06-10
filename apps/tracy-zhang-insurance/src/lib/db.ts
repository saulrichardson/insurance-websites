import postgres from "postgres";

type SqlClient = ReturnType<typeof postgres>;

declare global {
  var __tracy_zhang_insurance_sql: SqlClient | undefined;
}

export function getSql() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  if (!globalThis.__tracy_zhang_insurance_sql) {
    let ssl: false | "require" = "require";
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") ssl = false;
    } catch {
      ssl = "require";
    }

    globalThis.__tracy_zhang_insurance_sql = postgres(url, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl,
    });
  }

  return globalThis.__tracy_zhang_insurance_sql;
}
