---
title: Overview
description: What Vizably is and what it does.
sidebar:
  order: 1
---

<span class="codr-status codr-status--active">Active</span>

**Vizably** is an open-source web accessibility scanner. Paste a URL, get a
categorized, human-readable WCAG report with fix suggestions.

An idea by [@DevOlabode](https://github.com/DevOlabode). Source at
[github.com/codrlabs/vizably](https://github.com/codrlabs/vizably) — this is the
project to contribute to, see [Contributing](/start/contributing/).

## The problem it solves

Accessibility tooling tends to produce raw rule violations — accurate, and
almost unreadable if you are not already fluent in WCAG. Vizably takes the same
underlying analysis and turns it into a report a developer or a site owner can
act on: grouped by category, in plain language, with a suggested fix.

## How it is built

Two halves and one wire contract:

- **Backend** — Node + Express, layered outer to inner:
  `routes/` → `controllers/` → `services/`. `app.js` is the composition root:
  the single place concrete classes are constructed and wired, so every layer
  is unit-testable without a DI framework.
- **Frontend** — React + Vite. Pages are functional components in `views/`,
  side effects live in `hooks/`, and `lib/apiClient.js` is the only file that
  imports `fetch`.
- **Shared contract** — `shared/types.js` holds the JSDoc typedefs
  (`ScanResult`, `Violation`, …) imported by both sides. The wire format is the
  contract that matters.

## Accounts without a database

Vizably runs no database of its own. A signed-in user's whole account — profile,
settings, saved scans — lives in storage they already own: one GitHub repository
or one Google Drive folder. OAuth is used only to identify the user and get an
API token; the user-owned store is the source of truth.

That is what makes the product cheap enough to offer to everyone: no per-user
hosting, no lock-in, and an account that is portable across devices.

:::note[More to come]
Setup, the scan pipeline, and the account-storage contract each need their own
page here. For now the authoritative detail lives in the
[Vizably repository](https://github.com/codrlabs/vizably).
:::
