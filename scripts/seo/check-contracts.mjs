#!/usr/bin/env node

import { parseArgs } from "node:util";

import {
  domains,
  getOfficeById,
  products,
} from "../../packages/domain/src/index.ts";
import { stories } from "../../apps/tracy-zhang-insurance/src/content/stories.ts";

const CRAWLER_USER_AGENT =
  "insurance-websites-seo-contract-check/1.0 (+https://tracyzhanginsurance.com)";

const insuranceOrigin = `https://${domains.canonicalInsurance}`;
const sanMarinoOrigin = `https://${domains.local.sanMarino}`;
const laPalmaOrigin = `https://${domains.local.laPalma}`;
const personalOrigin = `https://www.${domains.personalAdvisor}`;

const insuranceStaticRoutes = [
  "/",
  "/products",
  "/location",
  "/locations",
  "/locations/san-marino",
  "/locations/la-palma",
  "/locations/cerritos",
  "/about",
  "/team",
  "/contact",
  "/privacy",
  "/terms",
  "/sms-terms",
  "/contact-consent",
  "/stories",
];

const noindexInsuranceRoutes = [
  "/thanks",
  "/auto-lead-intake",
  "/auto-lead-intake/terms",
];

export function toZhPath(path) {
  const [pathname, hash = ""] = path.split("#");
  const normalized = pathname === "/" || pathname === "" ? "" : pathname.replace(/\/$/, "");
  const zhPath = `/zh${normalized}`;
  return `${zhPath || "/zh"}${hash ? `#${hash}` : ""}`;
}

export function fromZhPath(path) {
  const [pathname, hash = ""] = path.split("#");
  const withoutPrefix = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return `${withoutPrefix}${hash ? `#${hash}` : ""}`;
}

function unique(items) {
  return [...new Set(items)];
}

function buildInsuranceIndexedRoutes() {
  return unique([
    ...insuranceStaticRoutes,
    ...products.map((product) => product.href),
    ...stories.map((story) => `/stories/${story.slug}`),
  ]);
}

function buildTargetConfig(args) {
  const target = args.values.target ?? "production";
  if (target !== "production" && target !== "local") {
    throw new Error(`Unsupported --target "${target}". Use "production" or "local".`);
  }

  const isLocal = target === "local";
  const localInsuranceOrigin = args.values["insurance-origin"] ?? "http://127.0.0.1:3000";
  const localPersonalOrigin = args.values["personal-origin"] ?? "http://127.0.0.1:3001";

  return {
    target,
    timeoutMs: Number(args.values["timeout-ms"] ?? 15000),
    json: Boolean(args.values.json),
    endpoints: {
      insurance: endpoint("insurance canonical", insuranceOrigin, isLocal ? localInsuranceOrigin : insuranceOrigin),
      sanMarino: endpoint("San Marino local", sanMarinoOrigin, isLocal ? localInsuranceOrigin : sanMarinoOrigin),
      laPalma: endpoint("La Palma local", laPalmaOrigin, isLocal ? localInsuranceOrigin : laPalmaOrigin),
      personal: endpoint("Tracy advisor", personalOrigin, isLocal ? localPersonalOrigin : personalOrigin),
    },
  };
}

function endpoint(label, publicOrigin, requestOrigin) {
  const publicUrl = new URL(publicOrigin);
  const requestUrl = new URL(requestOrigin);
  const localRequest = publicUrl.host !== requestUrl.host;

  return {
    label,
    publicOrigin: publicUrl.origin,
    requestOrigin: requestUrl.origin,
    hostHeader: localRequest ? publicUrl.host : undefined,
  };
}

export function normalizeUrl(input, base) {
  const url = new URL(input, base);
  url.hash = "";
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  const path = url.pathname === "/" ? "" : url.pathname;
  return `${url.protocol}//${url.host}${path}${url.search}`;
}

function expectedUrl(origin, path) {
  return normalizeUrl(new URL(path, origin).toString());
}

function buildLocalizedAlternates(origin, path) {
  const englishPath = fromZhPath(path);
  const chinesePath = toZhPath(englishPath);

  return {
    "en-US": expectedUrl(origin, englishPath),
    "zh-Hans": expectedUrl(origin, chinesePath),
    "x-default": expectedUrl(origin, englishPath),
  };
}

async function fetchText(config, endpointConfig, path, accept = "text/html,application/xhtml+xml") {
  const requestUrl = new URL(path, endpointConfig.requestOrigin);
  const headers = {
    accept,
    "user-agent": CRAWLER_USER_AGENT,
  };
  if (endpointConfig.hostHeader) {
    headers.host = endpointConfig.hostHeader;
    headers["x-forwarded-host"] = endpointConfig.hostHeader;
    headers["x-forwarded-proto"] = "https";
  }

  const response = await fetch(requestUrl, {
    headers,
    redirect: "follow",
    signal: AbortSignal.timeout(config.timeoutMs),
  });

  return {
    requestUrl: requestUrl.toString(),
    publicUrl: new URL(path, endpointConfig.publicOrigin).toString(),
    response,
    text: await response.text(),
  };
}

function parseAttributes(rawAttributes) {
  const attributes = {};
  const attributePattern = /([\w:-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = attributePattern.exec(rawAttributes))) {
    const [, rawName, , doubleQuoted, singleQuoted, unquoted] = match;
    attributes[rawName.toLowerCase()] = decodeHtmlEntities(doubleQuoted ?? singleQuoted ?? unquoted ?? "");
  }

  return attributes;
}

function findTags(html, tagName) {
  const tags = [];
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  let match;

  while ((match = pattern.exec(html))) {
    tags.push(parseAttributes(match[1]));
  }

  return tags;
}

function findLinkLikeTags(html) {
  const tags = [];
  const pattern = /<(?:xhtml:)?link\b([^>]*)>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    tags.push(parseAttributes(match[1]));
  }

  return tags;
}

function relTokens(attributes) {
  return (attributes.rel ?? "").toLowerCase().split(/\s+/).filter(Boolean);
}

function getCanonical(html) {
  const canonical = findTags(html, "link").find((tag) => relTokens(tag).includes("canonical"));
  return canonical?.href;
}

function getAlternates(html) {
  const alternates = {};
  for (const tag of findTags(html, "link")) {
    if (!relTokens(tag).includes("alternate") || !tag.hreflang || !tag.href) continue;
    alternates[tag.hreflang] = tag.href;
  }
  return alternates;
}

function getRobotsMeta(html) {
  const robots = findTags(html, "meta").find((tag) => tag.name?.toLowerCase() === "robots");
  return robots?.content ?? "";
}

function getAnchorHrefs(html) {
  return findTags(html, "a")
    .map((tag) => tag.href)
    .filter((href) => href && !href.startsWith("#") && !/^(mailto|tel|javascript):/i.test(href));
}

function parseJsonLd(html) {
  const values = [];
  const errors = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const attributes = parseAttributes(match[1]);
    if (!attributes.type?.toLowerCase().includes("ld+json")) continue;

    const rawJson = decodeHtmlEntities(match[2].trim());
    try {
      values.push(JSON.parse(rawJson));
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return { values, errors };
}

function collectJsonLdTypes(value, types = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectJsonLdTypes(item, types);
    return types;
  }

  if (!value || typeof value !== "object") return types;

  const type = value["@type"];
  if (Array.isArray(type)) types.push(...type);
  if (typeof type === "string") types.push(type);

  for (const nested of Object.values(value)) {
    collectJsonLdTypes(nested, types);
  }

  return types;
}

function getJsonLdTypes(html) {
  const parsed = parseJsonLd(html);
  return {
    errors: parsed.errors,
    types: unique(parsed.values.flatMap((value) => collectJsonLdTypes(value))),
  };
}

function extractXmlLocs(xml) {
  const locs = [];
  const pattern = /<loc>([\s\S]*?)<\/loc>/gi;
  let match;

  while ((match = pattern.exec(xml))) {
    locs.push(decodeHtmlEntities(match[1].trim()));
  }

  return locs;
}

function extractXmlAlternates(xml) {
  const alternates = [];
  for (const tag of findLinkLikeTags(xml)) {
    if (!relTokens(tag).includes("alternate") || !tag.hreflang || !tag.href) continue;
    alternates.push({ hreflang: tag.hreflang, href: tag.href });
  }
  return alternates;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}

function createCase(name) {
  return {
    name,
    failures: [],
    assert(condition, message) {
      if (!condition) this.failures.push(message);
    },
    equal(actual, expected, message) {
      this.assert(actual === expected, `${message}: expected ${expected}, got ${actual ?? "missing"}`);
    },
    urlEqual(actual, expected, message, base) {
      const normalizedActual = actual ? normalizeUrl(actual, base) : undefined;
      const normalizedExpected = normalizeUrl(expected, base);
      this.equal(normalizedActual, normalizedExpected, message);
    },
    includes(values, expected, message) {
      this.assert(values.includes(expected), `${message}: missing ${expected}`);
    },
    excludes(values, unexpected, message) {
      this.assert(!values.includes(unexpected), `${message}: unexpectedly included ${unexpected}`);
    },
  };
}

async function runCase(results, name, fn) {
  const context = createCase(name);
  try {
    await fn(context);
  } catch (error) {
    context.failures.push(error instanceof Error ? error.message : String(error));
  }

  results.push({
    name,
    ok: context.failures.length === 0,
    failures: context.failures,
  });
}

function assertHtmlPage(context, fetched) {
  context.equal(fetched.response.status, 200, "HTTP status");
  const contentType = fetched.response.headers.get("content-type") ?? "";
  context.assert(contentType.includes("text/html"), `content-type should be text/html, got ${contentType}`);
}

function assertCanonical(context, html, expected, base) {
  context.urlEqual(getCanonical(html), expected, "canonical", base);
}

function assertAlternates(context, html, expected, base) {
  const alternates = getAlternates(html);
  for (const [hreflang, href] of Object.entries(expected)) {
    context.urlEqual(alternates[hreflang], href, `alternate ${hreflang}`, base);
  }
}

function assertNoHreflang(context, html) {
  const alternates = getAlternates(html);
  context.equal(Object.keys(alternates).length, 0, "hreflang alternate count");
}

function assertNoindex(context, html) {
  const robots = getRobotsMeta(html).toLowerCase();
  context.assert(robots.includes("noindex"), `robots meta should include noindex, got ${robots || "missing"}`);
}

function assertJsonLdTypes(context, html, expectedTypes) {
  const jsonLd = getJsonLdTypes(html);
  context.equal(jsonLd.errors.length, 0, "JSON-LD parse errors");
  for (const type of expectedTypes) {
    context.includes(jsonLd.types, type, "JSON-LD types");
  }
}

function assertInternalPaths(context, html, expectedPaths, origin) {
  const anchorPaths = new Set(
    getAnchorHrefs(html).map((href) => {
      const url = new URL(href, origin);
      return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    }),
  );

  for (const path of expectedPaths) {
    const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
    context.assert(anchorPaths.has(normalizedPath), `missing crawlable anchor to ${normalizedPath}`);
  }
}

function assertIncludes(context, html, expectedText) {
  context.assert(html.includes(expectedText), `missing rendered text: ${expectedText}`);
}

function assertExcludes(context, html, unexpectedText) {
  context.assert(!html.includes(unexpectedText), `unexpected rendered text: ${unexpectedText}`);
}

async function assertRobots(results, config, endpointConfig, expectedSitemap) {
  await runCase(results, `${endpointConfig.label} robots.txt`, async (context) => {
    const fetched = await fetchText(config, endpointConfig, "/robots.txt", "text/plain,*/*");
    context.equal(fetched.response.status, 200, "HTTP status");
    assertIncludes(context, fetched.text, `Sitemap: ${expectedSitemap}`);
    assertIncludes(context, fetched.text, "Allow: /");
  });
}

async function assertSitemap(results, config, endpointConfig, expected) {
  await runCase(results, `${endpointConfig.label} sitemap.xml`, async (context) => {
    const fetched = await fetchText(config, endpointConfig, "/sitemap.xml", "application/xml,text/xml,*/*");
    context.equal(fetched.response.status, 200, "HTTP status");
    const locs = extractXmlLocs(fetched.text).map((loc) => normalizeUrl(loc));
    const alternates = extractXmlAlternates(fetched.text);

    for (const url of expected.includeUrls ?? []) {
      context.includes(locs, normalizeUrl(url), "sitemap urls");
    }

    for (const url of expected.excludeUrls ?? []) {
      context.excludes(locs, normalizeUrl(url), "sitemap urls");
    }

    if (expected.exactUrls) {
      const actualSet = [...locs].sort();
      const expectedSet = expected.exactUrls.map((url) => normalizeUrl(url)).sort();
      context.equal(JSON.stringify(actualSet), JSON.stringify(expectedSet), "exact sitemap urls");
    }

    for (const alternate of expected.includeAlternates ?? []) {
      const found = alternates.some(
        (item) => item.hreflang === alternate.hreflang
          && normalizeUrl(item.href) === normalizeUrl(alternate.href),
      );
      context.assert(found, `missing sitemap alternate ${alternate.hreflang} ${alternate.href}`);
    }
  });
}

async function assertPage(results, config, endpointConfig, page) {
  await runCase(results, `${endpointConfig.label} ${page.path}`, async (context) => {
    const fetched = await fetchText(config, endpointConfig, page.path);
    assertHtmlPage(context, fetched);
    assertCanonical(context, fetched.text, page.canonical, endpointConfig.publicOrigin);

    if (page.alternates) assertAlternates(context, fetched.text, page.alternates, endpointConfig.publicOrigin);
    if (page.noHreflang) assertNoHreflang(context, fetched.text);
    if (page.noindex) assertNoindex(context, fetched.text);
    if (page.schemaTypes) assertJsonLdTypes(context, fetched.text, page.schemaTypes);
    if (page.internalPaths) assertInternalPaths(context, fetched.text, page.internalPaths, endpointConfig.publicOrigin);
    for (const text of page.includes ?? []) assertIncludes(context, fetched.text, text);
    for (const text of page.excludes ?? []) assertExcludes(context, fetched.text, text);
  });
}

function productById(id) {
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown product id: ${id}`);
  return product;
}

function buildInsurancePageContracts() {
  const contracts = [
    {
      path: "/",
      canonical: expectedUrl(insuranceOrigin, "/"),
      alternates: buildLocalizedAlternates(insuranceOrigin, "/"),
      schemaTypes: ["InsuranceAgency", "WebSite"],
      internalPaths: ["/products", "/contact", "/stories"],
    },
    {
      path: "/zh",
      canonical: expectedUrl(insuranceOrigin, "/zh"),
      alternates: buildLocalizedAlternates(insuranceOrigin, "/zh"),
      schemaTypes: ["WebPage", "BreadcrumbList", "InsuranceAgency", "WebSite"],
      internalPaths: ["/zh/products", "/zh/contact"],
      includes: ["保险"],
    },
    {
      path: "/products",
      canonical: expectedUrl(insuranceOrigin, "/products"),
      alternates: buildLocalizedAlternates(insuranceOrigin, "/products"),
      schemaTypes: ["InsuranceAgency", "WebSite"],
      internalPaths: products.map((product) => product.href),
    },
    {
      path: "/stories",
      canonical: expectedUrl(insuranceOrigin, "/stories"),
      alternates: buildLocalizedAlternates(insuranceOrigin, "/stories"),
      schemaTypes: ["InsuranceAgency", "WebSite"],
      internalPaths: stories.map((story) => `/stories/${story.slug}`),
    },
    ...noindexInsuranceRoutes.map((path) => ({
      path,
      canonical: expectedUrl(insuranceOrigin, path),
      noindex: true,
      noHreflang: true,
    })),
  ];

  for (const product of products) {
    const relatedPaths = product.related.map((id) => productById(id).href);
    contracts.push({
      path: product.href,
      canonical: expectedUrl(insuranceOrigin, product.href),
      alternates: buildLocalizedAlternates(insuranceOrigin, product.href),
      schemaTypes: ["Service", "BreadcrumbList", "InsuranceAgency", "WebSite"],
      internalPaths: relatedPaths,
    });
    contracts.push({
      path: toZhPath(product.href),
      canonical: expectedUrl(insuranceOrigin, toZhPath(product.href)),
      alternates: buildLocalizedAlternates(insuranceOrigin, product.href),
      schemaTypes: ["WebPage", "BreadcrumbList", "Service", "InsuranceAgency", "WebSite"],
      internalPaths: relatedPaths.map(toZhPath),
      includes: ["保险"],
    });
  }

  for (const story of stories) {
    const storyPath = `/stories/${story.slug}`;
    const relatedPaths = story.relatedProductIds.map((id) => productById(id).href);
    contracts.push({
      path: storyPath,
      canonical: expectedUrl(insuranceOrigin, storyPath),
      alternates: buildLocalizedAlternates(insuranceOrigin, storyPath),
      schemaTypes: ["Article", "BreadcrumbList", "InsuranceAgency", "WebSite"],
      internalPaths: relatedPaths,
    });
    contracts.push({
      path: toZhPath(storyPath),
      canonical: expectedUrl(insuranceOrigin, toZhPath(storyPath)),
      alternates: buildLocalizedAlternates(insuranceOrigin, storyPath),
      schemaTypes: ["WebPage", "Article", "BreadcrumbList", "InsuranceAgency", "WebSite"],
      internalPaths: relatedPaths.map(toZhPath),
      includes: ["保险"],
    });
  }

  return contracts;
}

function buildLocalHomeContracts(origin, activeOfficeId, inactiveOfficeId) {
  const activeOffice = getOfficeById(activeOfficeId);
  const inactiveOffice = getOfficeById(inactiveOfficeId);

  return [
    {
      path: "/",
      canonical: expectedUrl(origin, "/"),
      alternates: buildLocalizedAlternates(origin, "/"),
      schemaTypes: ["InsuranceAgency", "WebSite"],
      includes: [activeOffice.address.addressLocality, activeOffice.address.streetAddress],
      excludes: [
        inactiveOffice.address.streetAddress,
        inactiveOffice.phoneDisplay,
        inactiveOffice.phoneE164,
      ],
    },
    {
      path: "/zh",
      canonical: expectedUrl(origin, "/zh"),
      alternates: buildLocalizedAlternates(origin, "/zh"),
      schemaTypes: ["WebPage", "BreadcrumbList", "InsuranceAgency", "WebSite"],
      includes: ["保险", activeOffice.address.addressLocality, activeOffice.address.streetAddress],
      excludes: [
        inactiveOffice.address.streetAddress,
        inactiveOffice.phoneDisplay,
        inactiveOffice.phoneE164,
      ],
    },
  ];
}

function buildPersonalPageContracts() {
  return [
    {
      path: "/",
      canonical: expectedUrl(personalOrigin, "/"),
      alternates: buildLocalizedAlternates(personalOrigin, "/"),
      schemaTypes: ["Person", "ProfilePage", "WebSite", "InsuranceAgency"],
      internalPaths: ["/zh"],
      includes: ["Tracy Zhang"],
    },
    {
      path: "/zh",
      canonical: expectedUrl(personalOrigin, "/zh"),
      alternates: buildLocalizedAlternates(personalOrigin, "/zh"),
      schemaTypes: ["Person", "ProfilePage", "WebSite", "InsuranceAgency"],
      internalPaths: ["/"],
      includes: ["Tracy Zhang", "保险"],
    },
  ];
}

function buildCanonicalSitemapExpectations() {
  const routes = buildInsuranceIndexedRoutes();
  return {
    includeUrls: routes.flatMap((route) => [
      expectedUrl(insuranceOrigin, route),
      expectedUrl(insuranceOrigin, toZhPath(route)),
    ]),
    excludeUrls: noindexInsuranceRoutes.map((route) => expectedUrl(insuranceOrigin, route)),
    includeAlternates: [
      { hreflang: "zh-Hans", href: expectedUrl(insuranceOrigin, "/zh") },
      { hreflang: "zh-Hans", href: expectedUrl(insuranceOrigin, "/zh/auto-insurance") },
      {
        hreflang: "zh-Hans",
        href: expectedUrl(insuranceOrigin, `/zh/stories/${stories[0].slug}`),
      },
    ],
  };
}

function buildLocalSitemapExpectations(origin) {
  return {
    exactUrls: [
      new URL("/", origin).toString(),
      new URL("/zh", origin).toString(),
    ],
    includeAlternates: [
      { hreflang: "en-US", href: expectedUrl(origin, "/") },
      { hreflang: "zh-Hans", href: expectedUrl(origin, "/zh") },
      { hreflang: "x-default", href: expectedUrl(origin, "/") },
    ],
  };
}

function buildPersonalSitemapExpectations() {
  return {
    exactUrls: [
      new URL("/", personalOrigin).toString(),
      new URL("/zh", personalOrigin).toString(),
    ],
    includeAlternates: [
      { hreflang: "en-US", href: expectedUrl(personalOrigin, "/") },
      { hreflang: "zh-Hans", href: expectedUrl(personalOrigin, "/zh") },
      { hreflang: "x-default", href: expectedUrl(personalOrigin, "/") },
    ],
  };
}

async function runSeoContracts(config) {
  const results = [];
  const endpoints = config.endpoints;

  await assertRobots(results, config, endpoints.insurance, `${insuranceOrigin}/sitemap.xml`);
  await assertSitemap(results, config, endpoints.insurance, buildCanonicalSitemapExpectations());

  for (const page of buildInsurancePageContracts()) {
    await assertPage(results, config, endpoints.insurance, page);
  }

  await assertRobots(results, config, endpoints.sanMarino, `${sanMarinoOrigin}/sitemap.xml`);
  await assertSitemap(results, config, endpoints.sanMarino, buildLocalSitemapExpectations(sanMarinoOrigin));
  for (const page of buildLocalHomeContracts(sanMarinoOrigin, "san-marino", "la-palma")) {
    await assertPage(results, config, endpoints.sanMarino, page);
  }

  await assertRobots(results, config, endpoints.laPalma, `${laPalmaOrigin}/sitemap.xml`);
  await assertSitemap(results, config, endpoints.laPalma, buildLocalSitemapExpectations(laPalmaOrigin));
  for (const page of buildLocalHomeContracts(laPalmaOrigin, "la-palma", "san-marino")) {
    await assertPage(results, config, endpoints.laPalma, page);
  }

  await assertRobots(results, config, endpoints.personal, `${personalOrigin}/sitemap.xml`);
  await assertSitemap(results, config, endpoints.personal, buildPersonalSitemapExpectations());
  for (const page of buildPersonalPageContracts()) {
    await assertPage(results, config, endpoints.personal, page);
  }

  return results;
}

function printResults(results, config) {
  if (config.json) {
    console.log(JSON.stringify({ target: config.target, results }, null, 2));
    return;
  }

  for (const result of results) {
    if (result.ok) {
      console.log(`OK   ${result.name}`);
      continue;
    }

    console.log(`FAIL ${result.name}`);
    for (const failure of result.failures) {
      console.log(`     - ${failure}`);
    }
  }

  const failed = results.filter((result) => !result.ok);
  console.log("");
  console.log(`${results.length - failed.length}/${results.length} SEO contract checks passed.`);
}

export async function main(argv = process.argv.slice(2)) {
  const normalizedArgv = argv[0] === "--" ? argv.slice(1) : argv;
  const args = parseArgs({
    args: normalizedArgv,
    options: {
      target: { type: "string", default: "production" },
      "insurance-origin": { type: "string" },
      "personal-origin": { type: "string" },
      "timeout-ms": { type: "string", default: "15000" },
      json: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
  });

  if (args.values.help) {
    console.log(`Usage: node scripts/seo/check-contracts.mjs [options]

Options:
  --target production|local       Check live production domains or local servers. Default: production
  --insurance-origin <url>        Local insurance server origin for --target local. Default: http://127.0.0.1:3000
  --personal-origin <url>         Local advisor server origin for --target local. Default: http://127.0.0.1:3001
  --timeout-ms <ms>               Per-request timeout. Default: 15000
  --json                          Print machine-readable results
`);
    return 0;
  }

  const config = buildTargetConfig(args);
  const results = await runSeoContracts(config);
  printResults(results, config);

  return results.some((result) => !result.ok) ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const exitCode = await main();
  process.exitCode = exitCode;
}
