---
title: Scanning
description: How a submitted URL becomes a categorized WCAG report — Puppeteer, axe-core, and the transform between them.
sidebar:
  order: 6
---

Every scan is real: there is no mock mode in the running app. A submitted URL
gets a headless browser, a live axe-core run against the rendered page, and a
pure transform into Vizably's report shape.

## The pipeline

```
POST /api/scan { url }
        │
        ▼
routes/scan.js → controllers/scanController.js
        │  ssrfGuard.validate(url) — reject non-http, private/loopback hosts
        ▼
services/scanRunner.js — ScanRunner.run(url)
        │  launch headless Chromium
        │  page.goto(url, { waitUntil: 'domcontentloaded' })
        │  inject axe-core into the page context
        │  page.evaluate(() => axe.run())
        ▼
services/axeTransformer.js — transform(axeResults)
        │  bucket violations into visualAccessibility /
        │  structureAndSemantics / multimedia
        ▼
res.json(ScanResult) → /results?url=... renders it
```

## `ScanRunner` (`backend/services/scanRunner.js`)

`run(url)` does the whole lifecycle: validate, launch, navigate, inject,
evaluate, transform, close. A few decisions worth knowing if you're touching
this file:

- **Waits for DOM ready, not network idle.** Busy sites (ad-heavy pages,
  chat widgets) never reach `networkidle0` and would time out waiting for
  it. The runner waits for `domcontentloaded`, then gives the page a short,
  best-effort idle window (`waitForNetworkIdle`, 500ms idle / 5s cap,
  swallowed on timeout) so late content has a chance to settle without
  blocking the scan on it.
- **Bypasses CSP before navigating.** Many sites ship a strict
  `Content-Security-Policy` that would otherwise block the injected
  `<script>` tag axe-core needs.
- **Resolves its browser driver per call, not at module load.** `puppeteer`
  ships its own Chromium download; that download doesn't happen in every
  deploy target (a serverless build skips it), so the runner probes for a
  usable local binary via `puppeteer.executablePath()` and falls back to
  `puppeteer-core` + `@sparticuz/chromium` (a Brotli-compressed build
  unpacked at runtime) when there isn't one. This is a capability probe, not
  an environment-variable branch — `VERCEL` and similar flags are opt-in
  settings, not proof a browser is actually available.
- **In Docker, the runner drives system Chromium.** Puppeteer's own download
  doesn't run on Alpine's musl libc, so the image installs Chromium via
  `apk` and points `PUPPETEER_EXECUTABLE_PATH` at it — see
  `backend/Dockerfile`.
- **Constructor deps are injectable**, so tests supply a fake `puppeteer`
  and never launch a real browser.

## `axeTransformer` (`backend/services/axeTransformer.js`)

Pure function: `transform(axeResults) → ScanResult`. No I/O, no globals —
same input always produces the same output, which is what makes it testable
without a browser.

`bucketFor(tags)` maps each axe-core violation's `tags` array to one of three
buckets, checked in order:

1. `multimedia` — `cat.text-alternatives`, `cat.media`, `cat.time-and-media`
2. `structureAndSemantics` — `cat.structure`, `cat.semantics`, `cat.tables`,
   `cat.parsing`, `cat.aria`, `cat.name-role-value`
3. `visualAccessibility` — everything else (contrast, color, sensory, focus)

Each violation becomes a `{ id, name, category, rootCause, codeSnippet,
solution, count, impact, helpUrl, tags }` entry; `passes` becomes the
`whatsGood` list. `count` is the number of DOM nodes the rule flagged, not
the number of distinct rules.

## `ssrfGuard` (`backend/services/ssrfGuard.js`)

The scan boundary's actual security control. Pure, no I/O, returns
`{ ok: true, url }` or `{ ok: false, reason }` rather than throwing so
callers can map a failure straight to a 4xx response.

Rejects:

- Anything that isn't `http:` or `https:`.
- `localhost` and its aliases.
- Private/loopback IPv4 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`,
  `127.0.0.0/8`, `169.254.0.0/16`).
- IPv6 loopback (`::1`) and unique-local/link-local ranges (`fc00::/7`,
  `fe80::/10`).

The controller runs it once on the raw request, and `ScanRunner.run` runs it
again before ever touching Puppeteer — the frontend's own check in
[URL normalization](/vizably/url-normalization/) is a convenience layer, not
a boundary; this is the boundary.

## Wiring

`app.js`, the composition root, constructs one `ScanRunner` and injects it
into `ScanController`. Nothing else constructs either directly — see
[Architecture](/vizably/architecture/) for why that matters.

## Tests

| File | Covers |
| --- | --- |
| `backend/tests/scanRunner.test.js` | Orchestration, with a fake Puppeteer — no real Chromium in CI |
| `backend/tests/axeTransformer.test.js` | Bucketing and shape of `transform()` |
| `backend/tests/ssrfGuard.test.js` | Every rejection case above |
| `backend/tests/scan.test.js` | `POST /api/scan` end to end, via `buildApp({ scanRunner: fake })` |

Run with `npm test` in `backend/`.
