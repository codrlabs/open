---
title: Getting started
description: Clone, run and test Vizably locally — Docker or plain Node, in under 15 minutes.
sidebar:
  order: 2
---

This gets you from `git clone` to a running app with a green test suite. It
assumes nothing beyond `git` and a browser.

## Prerequisites

One of:

- **Docker Desktop**, recommended — one install, no Node version juggling.
- **Node.js 24** and a recent npm. Check with `node -v`. CI and
  `backend/package.json`'s `engines` field both pin 24; older versions are
  not tested against.

You do not need Postgres or any cloud account to run the app locally. Puppeteer
and axe-core install with `npm install` in `backend/` (Puppeteer downloads its
own Chromium; the Docker image installs Alpine's system Chromium instead).

## Clone the repo

```bash
git clone https://github.com/codrlabs/vizably.git
cd vizably
```

The [Architecture](/vizably/architecture/) page covers the folder layout; the
repository's own `README.md` has the up-to-date directory tree.

## Set the two required secrets

The server **refuses to start** without `SESSION_SECRET` and `ENCRYPTION_KEY`
set — `backend/index.js` throws on boot if either is missing, even for local
development with no OAuth configured. This is a real requirement, not a
Phase-1 placeholder: sessions are a signed cookie
(`cookie-session`, not a server-side store), and that cookie has to be signed
with something.

```bash
cd backend
cp .env.example .env
openssl rand -base64 32   # run twice, paste one value each into
                          # SESSION_SECRET and ENCRYPTION_KEY in .env
```

Everything else in `.env.example` (the GitHub App credentials) is only needed
to exercise sign-in and saved scans — see
[Account storage](/vizably/account-storage/). Scanning a URL works without
them.

:::note[Docker users]
`docker-compose.yml` does not currently inject `SESSION_SECRET` or
`ENCRYPTION_KEY` into the backend container, so `docker compose up` fails at
boot on a fresh clone until you either add them to the compose file's
`environment:` block or otherwise get them into the container's environment.
Local Node picks up `backend/.env` automatically through `dotenv`.
:::

## Run the app

### Option A — Docker

```bash
docker compose up --build
```

First run takes a couple of minutes (pulling `node:22-alpine`, installing
dependencies in both containers). Once you see the frontend and backend both
report they're listening, open <http://localhost:5173>.

### Option B — local Node

Two terminals:

```bash
# Terminal 1 — backend (Express on :3000)
cd backend
npm install
npm run dev      # nodemon, reloads on save

# Terminal 2 — frontend (Vite on :5173)
cd frontend
npm install
npm run dev      # hot-reloads on save
```

Open <http://localhost:5173>.

## Smoke-test it

Every submission runs a real Puppeteer + axe-core scan — there is no mock
mode in the running app.

1. Open <http://localhost:5173>. Type a URL — bare domains work too
   (`example.com`), see [URL normalization](/vizably/url-normalization/) —
   and submit.
2. The scan takes a few seconds against the live page. You land on
   `/results?url=...`: a score, severity badges, and findings grouped into
   Visual Accessibility, Structure & Semantics and Multimedia, plus a "what's
   good" list.
3. Click a finding to go to `/problem/:id` — root cause, offending markup,
   fix steps and a WCAG reference.

Or verify the API directly:

```bash
curl http://localhost:3000/health

curl "http://localhost:3000/api/scan-results?url=https://example.com"
# real scan — expect several seconds

curl "http://localhost:3000/api/scan-results?url=http://127.0.0.1"
# 400 {"error":"Private/loopback hosts are not allowed"} — the SSRF guard
```

## Run the tests

```bash
cd backend  && npm test               # node:test + supertest
cd frontend && npm test:run           # Vitest, single run
cd frontend && npm run lint
cd frontend && npm run build
```

These are what CI runs on every pull request. Run them once on a clean clone
so you know what green looks like before you make your first edit.

## Where to look next

1. [Architecture](/vizably/architecture/) — the layers and the folders.
2. [Account storage](/vizably/account-storage/) — the portable-account model
   behind sign-in and saved scans.
3. [Scanning](/vizably/scanning/) — how a submitted URL turns into a report.
4. The repository's own `README.md` and `backend/README.md` for the
   authoritative, always-current directory layout and environment variable
   reference.
