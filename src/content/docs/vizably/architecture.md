---
title: Architecture
description: How Vizably is put together — the layers, the folders, and the contract between the two halves.
sidebar:
  order: 2
---

Vizably is two halves and one wire contract. The backend knows nothing about
presentation; the frontend knows nothing about scanning. Everything they share
is a set of type definitions.

This page is the project-specific version of
[Layered architecture](/practices/layered-architecture/). Read that first for
the reasoning; this is where the folders actually are.

## The two halves

```
                    shared/types.js
              ScanResult, Violation, …  (no dependencies)
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌────────────────┐      HTTP (JSON)     ┌──────────────────┐
│   frontend/    │ ◀──────────────────▶ │    backend/      │
│  React + Vite  │      /api/*          │  Node + Express  │
│                │                      │                  │
│ views/         │                      │ routes/          │
│   ↓            │                      │   ↓              │
│ hooks/         │                      │ controllers/     │
│   ↓            │                      │   ↓              │
│ lib/apiClient  │                      │ services/        │
│   ↓            │                      │   ↓              │
│ utils/ (pure)  │                      │ data/            │
└────────────────┘                      └──────────────────┘
```

## Backend

Layers run outer to inner. Each one may call inward and never outward.

| Folder | Holds |
| --- | --- |
| `routes/` | URLs and verbs, delegating to a controller |
| `controllers/` | HTTP request/response handling — classes with constructor-bound methods |
| `services/` | The brain: domain logic and pure transformations, no HTTP |
| `data/` | Storage access, so the rest of the app stays storage-agnostic |

Two rules carry most of the weight:

**`app.js` is the composition root.** It is the one place concrete classes are
constructed and wired together. Every other module takes its dependencies as
arguments, which is what makes each layer unit-testable without a dependency
injection framework. Constructing a controller anywhere else bypasses that and
tests will fight you later.

**Pure modules take input and return output.** The axe transformer and the SSRF
guard have no side effects. Stateful things — the scan runner, a future browser
pool — are classes.

`index.js` is separate from `app.js` on purpose: environment, port and process
startup live there, so `app.js` can be imported by tests without listening on a
socket.

## Frontend

| Folder | Holds |
| --- | --- |
| `views/` | Screens — functional components the user navigates to |
| `hooks/` | Side effects and data fetching, in a `{ data, loading, error }` shape |
| `lib/apiClient.js` | **The only file that imports `fetch`** |
| `utils/` | Pure helpers — URL validation and similar |
| `design-system/` | Reusable UI primitives |

The one-file-imports-`fetch` rule is what keeps screens testable without a
server, and it is the anti-pattern most worth catching in review.

## Adding a feature

**Backend:** route → controller method → service function → maybe a data method,
then wire it in `app.js`.

**Frontend:** view → maybe a component → a hook to fetch → a method on the API
client.

**Both:** if the shape crossing the wire changes, edit `shared/types.js`
*first*, then ripple outward. A backend-only feature that forces a frontend
change means the contract drifted.

## Where to look when something breaks

| Symptom | Layer |
| --- | --- |
| 404 on an endpoint that should exist | `routes/` |
| Right endpoint, wrong status or wrong JSON shape | `controllers/` |
| Right shape, wrong values | `services/` |
| Right values, wrong on screen | `views/` or `design-system/` |
| Network call fires from somewhere unexpected | Something bypassed `lib/apiClient.js` |
| Works in a test, breaks in the app | Wiring in `app.js` |

## Accounts

Vizably keeps no database of its own — a signed-in user's account lives in
storage they already own. That subsystem has its own page:
[Account storage](/vizably/account-storage/).

## Source

[github.com/codrlabs/vizably](https://github.com/codrlabs/vizably). The
repository's own `README.md` describes the current directory layout; this page
describes the intent behind it.
