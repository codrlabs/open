---
title: Layered architecture
description: Naming the layer before you edit the file — the mental model, the cheat sheet, and the anti-patterns that give it away.
sidebar:
  order: 2
---

Hacking at something until it works is a good instinct. This page adds the
second instinct on top of it: **before you touch a file, name the layer it
belongs to.** If you can name the layer, you know where the change goes — and,
more usefully, which files you must leave alone.

## The model in one sentence

> Each file does one thing, and dependencies point downward only.

A typical full-stack project resolves to three columns:

```
                shared contract (types / wire shape)
                    no dependencies of its own
                              │
        ┌─────────────────────┴─────────────────────┐
        ▼                                           ▼
┌───────────────┐         HTTP (JSON)      ┌─────────────────┐
│   FRONTEND    │ ◀──────────────────────▶ │     BACKEND     │
│               │                          │                 │
│ views/pages   │                          │ routes          │
│      ↓        │                          │      ↓          │
│ hooks         │                          │ controllers     │
│      ↓        │                          │      ↓          │
│ api client    │                          │ services        │
│      ↓        │                          │      ↓          │
│ utils (pure)  │                          │ data            │
└───────────────┘                          └─────────────────┘
```

If a change touches files in **three different layers at once**, stop. Two
responsibilities have probably been collapsed into one. Split the change.

## The "which layer?" cheat sheet

Ask in order. Stop at the first yes.

### Backend

1. Does it change a URL or an HTTP verb? → `routes/`
2. Does it read the request, validate input, or shape the response? →
   `controllers/`
3. Is it a pure rule — same input, same output, no I/O? → `services/`
4. Is it just data — a fixture, a schema, a seed? → `data/`
5. Is it construction and wiring? → the **composition root** (one file, usually
   `app.js`). Nowhere else constructs concrete classes.
6. Is it environment, ports, process startup? → the entry point (`index.js`).

### Frontend

1. Is it a new screen or a new URL? → `views/` (or `pages/`) plus a route.
2. Is it the `{ data, loading, error }` shape around an API call? → `hooks/`
3. Does it import `fetch`? → the **API client**, and nowhere else.
4. Is it dumb UI — props in, markup and events out? → `components/`
5. Is it a pure helper with no framework and no I/O? → `utils/`
6. Is it a static asset? → `assets/`

### Shared

Did the shape of the data crossing the wire change? → **edit the shared contract
first**, then ripple outward. Never the other way round.

## Sizing a change by its layers

**One layer is the best possible change.** Accepting a bare hostname like
`example.com` where a full URL is expected is a change to one pure validator and
its test. It touches no screen, no hook, no network client, no backend. If you
find yourself adding `if (!input.startsWith(...))` inside a screen component,
you have smuggled domain logic upward — push it down.

**A swap behind a stable contract touches one side only.** Replacing mock data
with a real scanner meant a new service, a new driver module, one line in a
controller and one line of wiring. The frontend changed by zero lines, because
the wire shape did not change. That is the architecture earning its keep. If the
frontend *had* needed to change, that is the signal that the shared contract
drifted and should be fixed first.

**A cross-cutting feature grows downward from the contract.** Something like
accounts and saved history touches every layer. The order matters: extend the
shared types, then the backend from the data layer upward, then the frontend
from the client downward. Editing a screen and a storage file in the same commit
means the change is too wide.

**Presentation-only features stay above the hook.** If the state machine already
gives you `loading`, a skeleton loader is a component and some CSS. Do not add
new state for something the hook already tells you.

## Anti-patterns to call out in review

| Smell | What it actually means |
| --- | --- |
| `fetch(...)` outside the API client | The network leaked into a screen or a hook |
| Request/response objects inside a service | Controller logic leaked into the domain |
| Constructing a controller outside the composition root | Dependency injection bypassed; tests will fight you later |
| A hook returning some other shape | Every screen now consumes results differently |
| `window.location = ...` inside a screen | The router was bypassed; the back button breaks |
| Validation inside a screen component | Belongs in a pure helper |
| Frontend changed for a backend-only feature | The wire shape drifted — fix the shared contract first |

## The two questions before every pull request

1. **Which layers am I touching, and why?** If you cannot name them, you are
   hacking. Step back.
2. **What am I deliberately *not* touching?** That is how you prove the
   architecture is doing its job.

If both answers are short, the pull request will be short too.

## Where to look when something breaks

Read the path before you read the file. Symptom maps to layer:

- Wrong URL, 404 on an endpoint that should exist → routing.
- Right endpoint, wrong status or wrong shape → the controller.
- Right shape, wrong values → a service.
- Right values, wrong on screen → a view or a component.
- Correct once and wrong after a reload → caching, or state held in the wrong
  layer.
