#!/usr/bin/env node

import assert from "node:assert/strict";
import { brand, domains, publicContact } from "../../packages/domain/src/index.ts";

// Project-domain redirects live in Vercel. Check their public behavior separately
// from application SEO contracts, including method and query preservation.
const origin = `https://${domains.canonicalInsurance}`;
const oldHosts = [domains.legacyInsurance, `www.${domains.legacyInsurance}`, domains.campaign];
const paths = ["/", "/locations/cerritos?utm_source=migration_check&utm_medium=verification&ct=test%2Btoken", "/zh/auto-insurance?utm_campaign=domain_move"];
const request = (url, options = {}) => fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000), ...options });
let checks = 0;

for (const host of [...oldHosts, `www.${domains.canonicalInsurance}`]) {
  for (const path of paths) {
    const response = await request(`https://${host}${path}`);
    assert.equal(response.status, 308, `${host}${path}: permanent, method-preserving redirect`);
    assert.equal(response.headers.get("location"), `${origin}${path}`, `${host}${path}: exact destination`);
    checks++;
  }
  const response = await request(`https://${host}/api/auto-leads?utm_source=migration_check`, { method: "OPTIONS" });
  assert.equal(response.status, 308, `${host}: non-GET method redirect`);
  checks++;
}

for (const path of ["/", "/zh", "/contact", "/zh/contact"]) {
  const response = await request(`${origin}${path}`);
  assert.equal(response.status, 200, `${path}: new host must serve directly`);
  const html = await response.text();
  assert.ok(html.includes(brand.name), `${path}: new agency brand`);
  assert.ok(html.includes(publicContact.email), `${path}: verified public mailbox`);
  assert.ok(!html.includes("Tracy Zhang Insurance"), `${path}: old agency brand removed`);
  assert.ok(!html.includes(`https://${domains.legacyInsurance}`), `${path}: no old canonical links`);
  checks++;
}

console.log(`${checks}/${checks} production domain migration checks passed.`);
