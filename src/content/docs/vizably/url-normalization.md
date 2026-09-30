---
title: URL normalization
description: How the landing page accepts a bare domain like example.com without requiring https://, while the backend stays the source of truth.
sidebar:
  order: 5
---

The landing page accepts what a person actually types — `example.com`, not
`https://example.com` — while every request that reaches the backend is a
fully-qualified `http(s)` URL. Two layers do this, and only one of them is
allowed to say yes.

## Where it lives

```
User types "example.com" and submits
        │
        ▼
views/LandingView.jsx → normalizeUrl("example.com") → "https://example.com"
        │                    (null → inline error, no request sent)
        ▼
apiClient.runScan(normalized) → POST /api/scan
        │
        ▼
Backend: ssrfGuard re-validates → Puppeteer + axe-core scan
        │
        ▼
/results?url=... report
```

The frontend check is a convenience, not a boundary. `services/ssrfGuard.js`
on the backend is the actual source of truth and re-validates every URL it
receives, regardless of what the frontend already checked — see
[Scanning](/vizably/scanning/) for what it rejects and why.

## `frontend/src/utils/urlValidator.js`

Two functions:

**`isValidUrl(input)`** — true only for a parseable URL with an `http:` or
`https:` protocol. False for non-strings, empty input, other schemes
(`file:`, `javascript:`), and filesystem-style paths.

**`normalizeUrl(input)`** — accepts the bare-domain form and returns a full
URL, or `null` if it can't produce a valid one:

| Input | Result |
| --- | --- |
| `example.com` | `https://example.com` |
| `  wikipedia.org  ` | `https://wikipedia.org` (trimmed) |
| `https://example.com/path` | unchanged |
| `http://example.com` | unchanged — explicit `http` is respected |
| `not a url`, `justaword` | `null` |
| `""`, non-string input | `null` |
| `localhost:3000` | `null` |

The rules, in order: reject non-string or empty input; prepend `https://` if
there's no scheme already; the result must pass `isValidUrl`; and the
hostname must be dot-separated (`([\w-]+\.)+[\w-]{2,}`), so a bare word like
`justaword` can't slip through by getting a scheme prepended to it.

`localhost` and other loopback/private hosts are rejected here too, even
though nothing forces that client-side. The backend SSRF guard would reject
them anyway — accepting them here would only trade an instant inline error
for a slower round trip to get the same rejection.

## UI behavior — `views/LandingView.jsx`

- `normalizeUrl` returning `null` shows an inline error and sends no request.
- On success the *normalized* URL — never the raw input — is what gets
  passed onward, and it's echoed in the `/results?url=...` query string so a
  page refresh re-fetches the same report.
- A scan that fails server-side (SSRF rejection, navigation timeout, …)
  surfaces its error inline and returns the form to idle.

## Tests

- `frontend/src/__tests__/urlValidator.test.js` — the table above, plus
  non-string input and Windows/Unix path rejection.
- `frontend/src/__tests__/landingView.test.jsx` — invalid input shows an
  error without scanning; a bare domain calls `onScan("https://…")`; a
  pending scan shows a spinner; a failure surfaces inline.

Run with `npm test` in `frontend/`.
