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

test("renders the Project Development Office with programme controls and no WebGL ring", async () => {
  const response = await render("/record");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Project Development Office/);
  assert.match(html, /Project information and development controls/);
  assert.match(html, />18</);
  assert.match(html, /Development gates/i);
  assert.match(html, />22</);
  assert.match(html, /Controlled records/i);
  assert.doesNotMatch(html, /hero-canvas|TorusGeometry|WebGLRenderer|Interactive strata/i);
});

test("links the homepage to the Project Office without a canvas mount", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href=["']\/record["']/);
  assert.match(html, /Open the Project Office/i);
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
  assert.match(html, /name=["']theme-color["'][^>]*content=["']#10120f["']/i);

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
    assert.match(html, /Original interpretive visualisation|Concept visualisation/);
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
  assert.match(html, /Original interpretive visualisation/);
  assert.match(html, /Concept visualisation/);
});

test("renders the evidence boundary and decision-ready partnership experience", async () => {
  for (const pathname of ["/heritage", "/project", "/community", "/invest", "/visit", "/research", "/record"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.match(html, /How to read this platform/);
    assert.match(html, /Published evidence/);
    assert.match(html, /Verification required/);
  }

  const response = await render("/invest");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Help protect/);
  assert.match(html, /The right contribution begins with the right evidence/);
  assert.match(html, /Fund a defined outcome/);
  assert.match(html, /Partner assurance framework/);
  assert.match(html, /Turn an interest into a review-ready starting point/);
  assert.doesNotMatch(html, /guaranteed return|guaranteed jobs|guaranteed visitors/i);
});

test("uses the Abetifi ring mark as the favicon", async () => {
  const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  assert.match(favicon, /Abetifi Stone Age/);
  assert.match(favicon, /#D39743/i);
  assert.doesNotMatch(favicon, /#68C4FF|#0C79D8|#2E9EFF/i);
});
