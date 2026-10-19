// Playwright CLI run-code entry. Open the target agency site in a dedicated test session first.
async (page) => {
  const base = new URL(page.url()).origin;
  if (base === "null")
    throw new Error("Open the agency site before running this audit.");
  const xml = await (await page.request.get(base + "/sitemap.xml")).text();
  const routes = [
    ...new Set(
      [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        (m) => new URL(m[1]).pathname,
      ),
    ),
  ];
  const failures = [];
  const checks = [];
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of routes) {
    const response = await page.goto(base + path, {
      waitUntil: "domcontentloaded",
    });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      width: innerWidth,
      doc: document.documentElement.scrollWidth,
      headers: document.querySelectorAll("header").length,
      mains: document.querySelectorAll("main").length,
      forms: document.querySelectorAll("form,input,textarea,select").length,
      bar: !!document.querySelector(".site-mobile-contact,.mobile-contact"),
      lang: document.querySelector('[lang="zh-Hans"]')?.getAttribute("lang"),
      schedule: [...document.querySelectorAll("a[href]")].filter((a) =>
        /calendly|leadmanagementlab/i.test(a.getAttribute("href")),
      ).length,
      offenders: [...document.querySelectorAll("main *")]
        .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
        .slice(0, 4)
        .map((e) => ({
          tag: e.tagName,
          class: e.className,
          text: e.textContent.slice(0, 75),
        })),
    }));
    if (
      response.status() !== 200 ||
      result.width !== result.doc ||
      result.forms ||
      result.headers !== 1 ||
      result.mains !== 1 ||
      !result.bar ||
      result.schedule ||
      (path.startsWith("/zh") && !result.lang)
    )
      failures.push({ path, status: response.status(), ...result });
    checks.push({
      path,
      status: response.status(),
      width: result.width,
      documentWidth: result.doc,
    });
  }
  if (!failures.length && !errors.length)
    return { routes: routes.length, width: 320, failures, pageErrors: errors };
  if (failures.length || errors.length)
    throw Error(JSON.stringify({ failures, pageErrors: errors }));
}
