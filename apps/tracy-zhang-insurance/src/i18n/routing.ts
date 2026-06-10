export type Locale = "en" | "zh";

export const zhPrefix = "/zh";

export function isZhPath(path: string) {
  return path === zhPrefix || path.startsWith(`${zhPrefix}/`);
}

export function toZhPath(path: string): `/${string}` {
  const [pathname, hash = ""] = path.split("#");
  const normalized = pathname === "/" || pathname === "" ? "" : pathname.replace(/\/$/, "");
  const zhPath = `${zhPrefix}${normalized}`;
  return `${zhPath || zhPrefix}${hash ? `#${hash}` : ""}` as `/${string}`;
}

export function fromZhPath(path: string): `/${string}` {
  const [pathname, hash = ""] = path.split("#");
  const withoutPrefix = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return `${withoutPrefix}${hash ? `#${hash}` : ""}` as `/${string}`;
}

export function localizedHref(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === "zh") return toZhPath(path);
  return fromZhPath(path);
}

export function alternateLanguageHref(path: string) {
  return isZhPath(path) ? fromZhPath(path) : toZhPath(path);
}
