import assert from "node:assert/strict";
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

test("renders the Living Record with traceable evidence and no WebGL ring", async () => {
  const response = await render("/record");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /A living record/);
  assert.match(html, /Claim-level evidence register/);
  assert.match(html, /18[^<]*project-readiness gates/i);
  assert.doesNotMatch(html, /hero-canvas|TorusGeometry|WebGLRenderer|Interactive strata/i);
});

test("links the homepage to the public workspace without a canvas mount", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href=["']\/record["']/);
  assert.match(html, /Open the living record/i);
  assert.doesNotMatch(html, /<canvas|hero-canvas/i);
});
