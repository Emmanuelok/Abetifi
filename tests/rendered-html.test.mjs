import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders development preview metadata", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the Readiness Workspace with explicit editorial boundaries", async () => {
  const response = await render("/record");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Readiness Workspace/);
  assert.match(html, /Project information and proposed readiness controls/);
  assert.match(html, />18</);
  assert.match(html, /Proposed review gates/i);
  assert.match(html, />22</);
  assert.match(html, /Record requirements/i);
  assert.match(html, /not adopted project governance/i);
  assert.doesNotMatch(html, /hero-canvas|TorusGeometry|WebGLRenderer|Interactive strata/i);
});

test("links the homepage to the Readiness Workspace without a canvas mount", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href=["']\/record["']/);
  assert.match(html, /Open the Readiness Workspace/i);
  assert.doesNotMatch(html, /<canvas|hero-canvas/i);
});

test("renders the mobile cinematic wayfinding and viewport contract", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Begin the story/);
  assert.match(html, /Swipe through deep time/);
  assert.match(html, /Swipe perspectives/);
  assert.match(html, /Tap a level to change the concept view/);
  assert.match(html, /Swipe stakeholder groups/);
  assert.match(html, /Swipe to explore/);
  assert.match(html, /Swipe to review/);
  assert.match(html, /name=["']theme-color["'][^>]*content=["']#1e4d39["']/i);

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(css, /Mobile art direction/);
  assert.match(css, /\.time-stage__sticky\s*\{[^}]*display:\s*block/i);
  assert.match(css, /scroll-snap-type:\s*x mandatory/i);
  assert.match(css, /env\(safe-area-inset-top\)/i);
  assert.match(css, /Mobile landing hardening/);
  assert.match(css, /\.hero-facts article\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/i);
  assert.match(css, /\.role-constellation__core\s*>\s*span\s*\{[^}]*overflow-wrap:\s*break-word/i);
  assert.match(css, /\.mobile-menu\s*\{[^}]*overflow-x:\s*clip/i);
  assert.match(layout, /viewportFit:\s*["']cover["']/i);
});

test("ships one final mobile containment contract across every public route", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const marker = css.lastIndexOf("Mobile experience contract");
  const reviewerLayer = css.lastIndexOf("Reviewer legibility hardening");

  assert.ok(marker > reviewerLayer, "the authoritative mobile layer must remain last in the cascade");
  const mobileCss = css.slice(marker);

  assert.match(mobileCss, /--mobile-gutter:\s*16px/i);
  assert.match(mobileCss, /\.page-shell\s*\{[^}]*width:\s*auto[^}]*margin-inline:\s*var\(--mobile-gutter\)/i);
  assert.match(mobileCss, /\.hero-facts article\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(mobileCss, /\.page-hero--media \.page-hero-title h1\s*\{[^}]*overflow-wrap:\s*break-word/i);
  assert.match(mobileCss, /\.page-hero-stat--long\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(mobileCss, /\.mobile-menu nav\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(mobileCss, /\.mobile-route-dock\s*\{[^}]*position:\s*fixed/i);
  assert.match(mobileCss, /\.office-table-wrap::before\s*\{[\s\S]*?content:\s*["']Swipe table →["']/i);
  assert.match(mobileCss, /\.plant-track span\s*\{[^}]*min-width:\s*0/i);
  assert.match(mobileCss, /\.partnership-proof article[\s\S]*?grid-template-columns:\s*34px\s+minmax\(0,\s*1fr\)/i);
  assert.match(mobileCss, /\.status-pill\s*\{[^}]*white-space:\s*normal/i);
  assert.match(mobileCss, /\.office-status\s*\{[^}]*overflow-wrap:\s*anywhere/i);
  assert.match(mobileCss, /\.finance-card-heading small\s*\{[^}]*grid-column:\s*1/i);
  assert.match(mobileCss, /\.finance-results\s*\{[^}]*position:\s*static/i);
  assert.match(mobileCss, /\.programme-table button,[\s\S]*?\.evidence-list button\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(mobileCss, /\.museum-model__switcher\s*\{[^}]*height:\s*auto[^}]*overflow:\s*visible/i);
  assert.doesNotMatch(mobileCss, /\.page-hero--media \.page-hero-title h1\s*\{[^}]*overflow-wrap:\s*normal/i);

  for (const pathname of ["/", "/heritage", "/project", "/community", "/record", "/invest", "/visit", "/research"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /mobile-route-dock/);
  }

  const invest = await render("/invest");
  assert.match(await invest.text(), /page-hero-stat page-hero-stat--long/);

  const heritage = await render("/heritage");
  assert.match(await heritage.text(), /data-route=["']heritage["']/);
});

test("keeps desktop split narratives clear of their photographic panes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /Desktop split containment/);
  assert.match(css, /@media\s*\(min-width:\s*821px\)/i);
  assert.match(css, /--evidence-media-width:\s*48vw/i);
  assert.match(css, /grid-template-columns:\s*var\(--evidence-media-width\)\s+minmax\(0,\s*1fr\)/i);
  assert.match(css, /\.evidence-lens__shell\s*\{[^}]*z-index:\s*6/i);
  assert.match(css, /\.evidence-lens__lead,[\s\S]*?\.evidence-lens__tabs\s*\{[^}]*min-width:\s*0[^}]*margin-left:\s*clamp\(44px,\s*4\.5vw,\s*96px\)/i);
  assert.match(css, /\.museum-ascent__grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.92fr\)\s+minmax\(0,\s*1fr\)/i);
  assert.match(css, /\.office-console article\s*\{[^}]*grid-template-columns:\s*36px\s+minmax\(0,\s*\.8fr\)\s+minmax\(0,\s*1fr\)\s+32px/i);
  assert.match(css, /\.trust-manifesto__list article\s*\{[^}]*grid-template-columns:\s*54px\s+minmax\(0,\s*\.82fr\)\s+minmax\(0,\s*1\.18fr\)\s+34px/i);
  assert.match(css, /\.role-constellation__core\s*\{[^}]*width:\s*min\(46vw,\s*540px\)/i);

  const clamp = (minimum, preferred, maximum) => Math.min(maximum, Math.max(minimum, preferred));
  for (const viewport of [821, 1024, 1100, 1180, 1366, 1440, 1920, 2048, 2560]) {
    const visualEdge = viewport * 0.48;
    const protectedGutter = clamp(44, viewport * 0.045, 96);
    const rightInset = clamp(32, viewport * 0.04, 88);
    const contentLeft = visualEdge + protectedGutter;
    const contentWidth = viewport - rightInset - contentLeft;

    assert.ok(contentLeft - visualEdge >= 44, `missing desktop visual gutter at ${viewport}px`);
    assert.ok(contentWidth >= 340, `desktop evidence column is too narrow at ${viewport}px`);
  }
});

test("does not render retired campaign language", async () => {
  for (const pathname of ["/", "/heritage", "/project", "/community", "/record", "/research", "/visit", "/invest"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.doesNotMatch(
      html,
      /Living Record|Deep History, Shared Future|not the backdrop|Evidence is not decoration|Come for the view|Capital with a longer horizon|bankable|role-aware|built to be checked/i,
      `retired campaign language found on ${pathname}`,
    );
  }
});

test("renders a distinct disclosed visual on every interior route", async () => {
  const routeVisuals = {
    "/heritage": "page-heritage.webp",
    "/project": "page-project.webp",
    "/community": "page-community.webp",
    "/invest": "page-invest.webp",
    "/visit": "page-visit.webp",
    "/research": "page-research.webp",
    "/record": "page-record.webp",
  };

  for (const [pathname, filename] of Object.entries(routeVisuals)) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(filename.replace(".", "\\.")));
    assert.match(html, new RegExp(`src=["']\\/media\\/${filename.replace(".", "\\.")}["']`));
    assert.doesNotMatch(html, /\/_vinext\/image\?url=/);
    assert.match(html, /AI-generated illustration · not documentary evidence|AI-generated concept image · not an approved design/);
  }
});

test("replaces the landing diagrams with disclosed photographic scenes", async () => {
  const response = await render();
  const html = await response.text();

  for (const filename of [
    "deep-time-stratigraphy.webp",
    "evidence-material.webp",
    "evidence-research.webp",
    "evidence-living.webp",
    "museum-basement.webp",
    "museum-ground.webp",
    "museum-first.webp",
    "museum-second.webp",
  ]) {
    assert.match(html, new RegExp(filename.replace(".", "\\.")));
    assert.match(html, new RegExp(`src=["']\\/media\\/${filename.replace(".", "\\.")}["']`));
  }
  assert.doesNotMatch(html, /\/_vinext\/image\?url=/);
  assert.match(html, /AI-generated illustration · not documentary evidence/);
  assert.match(html, /AI-generated concept image · not an approved design/);
  assert.match(html, /legacy-return__visual-disclosure[^>]*>AI-generated illustration · not documentary or project evidence\./);
});

test("renders the evidence boundary and decision-ready partnership experience", async () => {
  for (const pathname of ["/heritage", "/project", "/community", "/invest", "/visit", "/research", "/record"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.match(html, /How to read this platform/);
    assert.match(html, /Published evidence/);
    assert.match(html, /AI-generated media/);
    assert.match(html, /Verification required/);
  }

  const response = await render("/invest");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Help protect/);
  assert.match(html, /The right contribution begins with the right evidence/);
  assert.match(html, /Scope a defined outcome/);
  assert.match(html, /Partner assurance framework/);
  assert.match(html, /Turn an interest into a review-ready starting point/);
  assert.doesNotMatch(html, /guaranteed return|guaranteed jobs|guaranteed visitors/i);
});

test("uses one authoritative seven-page sequence across navigation and page heroes", async () => {
  const routeNumbers = {
    "/heritage": "01",
    "/project": "02",
    "/community": "03",
    "/record": "04",
    "/invest": "05",
    "/visit": "06",
    "/research": "07",
  };

  for (const [pathname, number] of Object.entries(routeNumbers)) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`page-hero-index[^>]*>[\\s\\S]*?<span>${number}<\\/span>`));
  }

  const response = await render();
  const html = await response.text();
  assert.match(html, /First visit\?/);
  assert.match(html, /Seven-page site map|seven-page map/i);
  assert.match(html, /Swipe or tap a numbered page/i);
  for (const [pathname, number] of Object.entries(routeNumbers)) {
    assert.match(html, new RegExp(`href=["']${pathname}["'][^>]*>[\\s\\S]*?${number}[\\s\\S]*?`));
  }
  assert.doesNotMatch(html, /07 · Development Readiness Workspace|08 · Partnerships|09 · Long-term stewardship/);
  assert.doesNotMatch(html, />00<|00 · Overview|00 Overview/i);

  const researchResponse = await render("/research");
  const researchHtml = await researchResponse.text();
  assert.match(researchHtml, /Return[\s\S]*?Overview/);
  assert.doesNotMatch(researchHtml, />00<|00 · Overview|00 Overview/i);
});

test("keeps the sitemap and local workspace numbering unambiguous", async () => {
  const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const recordResponse = await render("/record");
  const recordHtml = await recordResponse.text();

  assert.match(sitemapSource, /navigation\.map\(\(item\) => item\.href\)/);
  assert.match(recordHtml, /aria-label=["']Workspace views["']/);
  assert.match(recordHtml, /aria-label=["']Workspace view 01: Overview["']/);
  assert.match(recordHtml, /aria-label=["']Workspace view 06: Decision packs["']/);
});

test("defines, exposes and links all 18 proposed development gates", async () => {
  const recordResponse = await render("/record");
  const recordHtml = await recordResponse.text();
  const gateIds = [...recordHtml.matchAll(/id=["']gate-([^"']+)["']/g)].map((match) => match[1]);

  assert.equal(new Set(gateIds).size, 18);
  assert.match(recordHtml, /What the 18 proposed development gates mean/);
  assert.match(recordHtml, /checkpoint created for this website/i);
  assert.match(recordHtml, /not statutory approvals, an adopted project process or proof/i);
  assert.match(recordHtml, /Question to resolve/);
  assert.match(recordHtml, /Evidence to review/);
  assert.match(recordHtml, />G01</);
  assert.match(recordHtml, />G18</);
  assert.match(recordHtml, /Stable ID ·/);
  assert.match(recordHtml, /legal-entity/);
  assert.match(recordHtml, /Current public-pack position/);
  assert.match(recordHtml, /Linked record requirements/);
  assert.match(recordHtml, /GOV-01/);
  assert.match(recordHtml, /Legal entity record/);
  assert.match(recordHtml, /website-authored diligence checkpoint/i);

  const dataSource = await readFile(new URL("../app/lib/record-data.ts", import.meta.url), "utf8");
  const officeSource = await readFile(new URL("../app/components/ProjectOffice.tsx", import.meta.url), "utf8");
  assert.match(dataSource, /sources:\s*\["shaw1944",\s*"smith1975",\s*"watson2017"\]/);
  for (let index = 1; index <= 18; index += 1) {
    assert.match(dataSource, new RegExp(`code: ["']G${String(index).padStart(2, "0")}["']`));
  }
  assert.match(officeSource, /"Gate code",\s*"Stable ID",\s*"Group",\s*"Question",\s*"Evidence required",\s*"Current public-pack position",\s*"Linked record IDs",\s*"Source boundary"/);

  const homeResponse = await render();
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /href=["']\/record#development-gates["']/);
  assert.match(homeHtml, /View all[\s\S]*?18[\s\S]*?proposed gates/);
});

test("ships the reviewer-requested contrast, navigation and headline safeguards", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const partnership = await render("/invest");
  const partnershipHtml = await partnership.text();

  assert.match(css, /--forest:\s*#2f6b50/i);
  assert.match(css, /--on-dark-muted:\s*rgba\(255,\s*248,\s*232,\s*0\.9\)/i);
  assert.match(css, /\.opportunity-section \.split-heading > p\s*\{[^}]*color:\s*var\(--on-dark-muted\)/i);
  assert.match(css, /Reviewer legibility hardening/i);
  assert.match(css, /\.scale-threshold__statement h2\s*\{\s*color:\s*var\(--on-dark\)/i);
  assert.match(css, /\.page-hero-title h1,[\s\S]*?line-height:\s*\.98/i);
  assert.match(css, /\.visual-boundary\s*\{[^}]*font-size:\s*1em\s*!important/i);
  assert.match(css, /\.desktop-nav a > span/);
  assert.match(partnershipHtml, /Clarify public responsibilities and coordinate heritage protection and essential infrastructure/);
  assert.doesNotMatch(partnershipHtml, /Coordinate lawful authority/i);
  assert.match(partnershipHtml, />D1</);
  assert.match(partnershipHtml, />D6</);
  assert.match(partnershipHtml, /Decision domain/);
  assert.doesNotMatch(partnershipHtml, />G[1-6]</);
  assert.doesNotMatch(partnershipHtml, /Evidence gate/);
});

test("makes the visual-evidence boundary explicit", async () => {
  const researchResponse = await render("/research");
  const researchHtml = await researchResponse.text();

  assert.match(researchHtml, /What is evidence—and what is illustration/);
  assert.match(researchHtml, /Every current photographic-style image and the opening film are AI-generated/i);
  assert.match(researchHtml, /Images on this platform are not used as proof/i);
  assert.doesNotMatch(researchHtml, /Original interpretive visualisation|>Concept visualisation</i);
  assert.match(researchHtml, /PROP-MAN-01/);
  assert.match(researchHtml, /PROP-ARC-01/);
  assert.match(researchHtml, /PROP-BOQ-01/);
  assert.match(researchHtml, /Locator not yet verified/i);
  assert.match(researchHtml, /Claim-level sheet locator not yet verified/i);

  const homeResponse = await render();
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /AI-generated illustration · not documentary or project evidence\./);

  const provenance = await readFile(new URL("../docs/media-provenance.md", import.meta.url), "utf8");
  assert.match(provenance, /abetifi-hero\.mp4/);
  assert.match(provenance, /24ea5afff117296aed5b08abfd157be398bb1955fbf40cf9ce4e455fd02f81ee/);
  assert.match(provenance, /abetifi-hero-poster\.jpg/);
  assert.match(provenance, /2a435f2b67a7b6b44a3144a88dcd3ee0897549ccf80d1f33d71613a109559d61/);
  assert.match(provenance, /generator and generation-job metadata were not retained/i);
  assert.match(provenance, /excluded from documentary and project evidence/i);
  assert.doesNotMatch(provenance, /Rights class:\s*original generated media/i);
});

test("enforces claim provenance and current-state boundaries across the public routes", async () => {
  const routes = ["/", "/heritage", "/project", "/community", "/record", "/research", "/visit", "/invest"];
  const rendered = {};

  for (const pathname of routes) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    rendered[pathname] = html;
    assert.doesNotMatch(html, /6\.85°|0\.80°|google\.com\/maps/i);
    assert.doesNotMatch(html, /Project Development Office|22 controlled records|confirmed approvals/i);
    assert.doesNotMatch(html, /guaranteed return|guaranteed jobs|guaranteed visitors|UNESCO-listed/i);
  }

  assert.match(rendered["/"], /50\.37 acres; the supplied manuscript states approximately 50\.54 acres/i);
  assert.match(rendered["/"], /not evidence of continuous residence/i);
  assert.match(rendered["/visit"], /No verified visitor entrance pin/i);
  assert.match(rendered["/project"], /does not establish current operating, approval, funding or construction status/i);
  assert.match(rendered["/record"], /National Museum Decree, 1969/i);
  assert.match(rendered["/record"], /Checked 7 August 2026/i);
  assert.match(rendered["/record"], /does not imply endorsement, approval, compliance or partnership/i);
  assert.match(rendered["/research"], /What each kind of source can—and cannot—establish/i);
  assert.match(rendered["/research"], /10\.1017\/S0079497X00020016/i);
  assert.match(rendered["/research"], /10\.1017\/S0079497X00010975/i);
  assert.match(rendered["/research"], /10\.1007\/s00334-015-0514-2/i);
  assert.match(rendered["/research"], /10\.1080\/0067270X\.2017\.1393925/i);
  assert.match(rendered["/invest"], /Archived 2023 call/i);
  assert.match(rendered["/invest"], /Not eligible under cited 2026 criteria/i);
  assert.match(rendered["/invest"], /Every listed call is closed, expired or archived/i);
});

test("uses the Abetifi ring mark as the favicon", async () => {
  const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  const versionedFavicon = await readFile(new URL("../public/abetifi-favicon-20260807.svg", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const manifest = await readFile(new URL("../app/manifest.ts", import.meta.url), "utf8");
  assert.match(favicon, /Abetifi Stone Age/);
  assert.match(favicon, /#D39743/i);
  assert.match(versionedFavicon, /Abetifi Stone Age/);
  assert.match(versionedFavicon, /#D39743/i);
  assert.match(layout, /abetifi-favicon-20260807\.svg/);
  assert.match(layout, /abetifi-favicon-20260807\.ico/);
  assert.match(layout, /abetifi-apple-touch-icon-20260807\.png/);
  assert.match(manifest, /abetifi-icon-192-20260807\.png/);
  assert.match(manifest, /abetifi-icon-512-20260807\.png/);
  assert.doesNotMatch(favicon, /#68C4FF|#0C79D8|#2E9EFF/i);
  assert.doesNotMatch(versionedFavicon, /#68C4FF|#0C79D8|#2E9EFF/i);

  for (const filename of [
    "abetifi-favicon-32-20260807.png",
    "abetifi-apple-touch-icon-20260807.png",
    "abetifi-icon-192-20260807.png",
    "abetifi-icon-512-20260807.png",
  ]) {
    const png = await readFile(new URL(`../public/${filename}`, import.meta.url));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }

  for (const filename of ["favicon.ico", "abetifi-favicon-20260807.ico"]) {
    const ico = await readFile(new URL(`../public/${filename}`, import.meta.url));
    assert.deepEqual([...ico.subarray(0, 4)], [0, 0, 1, 0]);
  }
});
