---
title: Account storage
description: Vizably keeps no database — a user's account lives in a GitHub repo they already own.
sidebar:
  order: 4
---

Vizably runs **no database of its own**. A signed-in user's entire account —
profile, settings, saved scans — lives in one GitHub repository they already
own.

OAuth is used only to *identify* the user and obtain an API token. The
user-owned store is the source of truth.

Two things fall out of that. The product costs almost nothing per user to
operate, which is what makes it viable to offer for free. And the account is
portable — it moves between devices, and it survives Vizably.

## The connection flow

**Sign in → discover or create → load or init.** Connect is one button: the
user never names or picks a repository.

1. The user signs in with GitHub.
2. Vizably **discovers** an existing account store by looking for
   `vizably.json` — never by matching the repository name. It checks the
   store recorded in the session first, then `GET`s `viz_scans`, then lists
   the user's repositories as a fallback. If nothing is found, it **creates**
   the next default location: `viz_scans`, then `viz_scans-2`, `viz_scans-3`,
   … if that name is taken. There is no name field and no repository picker;
   a chooser appears only when discovery finds two or more stores.
3. Vizably runs a **fit-check** against the store.
4. Vizably either loads the existing account or initialises the store.

GitHub's own permissions remain the account ACL — Vizably adds no extra
ownership check.

## On-disk layout

Rooted at the repository root:

```
<storage root>/
├── vizably.json          # manifest: identity, storage binding, cached summary
└── scans/
    ├── index.json        # cache: lightweight list for the dashboard
    └── <scanId>_<host>.json   # one immutable scan per file
```

**Truth versus cache.** The files in `scans/` are the truth. `index.json` and
the manifest's `summary.scanCount` are caches, always rebuildable by listing
`scans/*.json`. A reader reconciles on load and never trusts a cache over the
files.

## The manifest

`vizably.json` carries a `schemaVersion`, a random account UUID, the storage
binding, settings, and a rebuildable summary.

Field rules that matter:

- **`account.id` is a random UUID** minted at init and never changed. Provider
  login and email are display only.
- **Record stable provider ids**, not names — repository node id, owner
  id. Names change; ids do not.
- **`schemaVersion` is for breaking changes.** A companion
  `minReaderSchemaVersion` lets a newer writer mark a store unreadable by
  too-old clients, so an old client reports "incompatible" instead of corrupting
  the store.
- **Caches never block a load.** If `summary` disagrees with `scans/`,
  reconcile — do not fail.
- **Never store OAuth tokens, refresh tokens, API keys or any secret.** Tokens
  are encrypted at rest in the session (AES-256-GCM) and never written to the
  user's repository.

## The fit-check

Given a discovered or created store, the backend returns a status, an optional reason, and
probed capabilities.

| Condition | Status |
| --- | --- |
| No manifest, store otherwise empty | `initializable` |
| No manifest, store has unrelated files | `unrelated` |
| Manifest unparseable or missing required fields | `invalid` |
| Manifest found but not a Vizably store | `unrelated` |
| `schemaVersion` newer than the server supports | `incompatible` |
| `schemaVersion` older but migratable | `loadable` (migration required) |
| Supported `schemaVersion` | `loadable` |

Capabilities — `canRead`, `canWrite`, `canCreate` — are probed against the
provider and returned alongside. A read-only fork comes back `loadable` with
`canWrite: false`, so the UI can browse saved scans while disabling new saves.

## Concurrency is the hard part

Multiple devices and collaborators touch the same store, so partial writes are
expected rather than exceptional.

- **Scan files are immutable.** They are never rewritten in place.
- **Init revalidates immediately before writing** and creates the manifest only
  if it still does not exist. A `validate` result from a moment ago may already
  be stale — another device may have initialised in between.
- **GitHub writes use the blob `sha`** for optimistic concurrency, and prefer a
  single commit carrying every changed file. On a stale-sha conflict, refetch
  and retry. Write the immutable scan file first, so truth is never lost, and
  let load-time reconciliation heal any gap in the caches.

## Identity and disclosure

**Identity is possession-based by default:** whoever can read and write the
store can load the account. The storage ACL *is* the account ACL. That is a
deliberate trade and it needs saying out loud in the UI, not just in docs.

One other thing must be disclosed in the interface rather than buried:
deleting a scan removes the file and refreshes the caches, but **GitHub
history may still contain the deleted blob** unless history is rewritten. Do
not claim permanence you cannot deliver.

Deletion comes in two sizes:

- **One scan** — `DELETE /api/scans/:id` removes the immutable
  `scans/<scanId>_<host>.json` and refreshes `scans/index.json` and the
  manifest `summary`.
- **Every scan** — `DELETE /api/scans` removes all scan files under `scans/`
  (keeping `index.json`), then writes an empty index and
  `summary.scanCount: 0`. The manifest identity and the repository itself
  remain.

## GitHub access is a GitHub App, not a plain OAuth scope

GitHub storage is authorized through a **GitHub App** (`GITHUB_APP_ID` +
`GITHUB_APP_PRIVATE_KEY`, installed per-account) rather than a classic OAuth
App with a `repo` scope. That is a deliberate choice: a classic `repo` scope
is all-or-nothing across every repository the user owns, while a GitHub App
installation can be scoped to the one repository Vizably actually needs —
narrower access, disclosed as such. The backend resolves the installation for
a given `owner/repo` via the Apps API before writing
(`backend/services/authService.js`).

## Endpoints and current gaps

The auth/storage API lives under `/api/auth/*`. `backend/README.md` in the
repository keeps the endpoint table current — read that rather than this page
for the exact routes, since this is the part of Vizably still changing
fastest. Worth knowing going in:

- **Discovery and creation are separate calls.** `GET
  /api/auth/storage/discover` finds existing stores;
  `POST /api/auth/storage/create` creates a new private repository. Every
  repository Vizably creates carries the `viz_` prefix (`viz_scans` by
  default), and the user never types a name.

## Implementer checklist

- [ ] Manifest written with a random `account.id` and stable provider ids
- [ ] Scan files immutable, named `<scanId>_<host>.json`, id is a UUID
- [ ] `index.json` and `summary` treated as caches, rebuilt on load
- [ ] Fit-check returns status, reason and capabilities
- [ ] `init` revalidates and conditionally creates the manifest
- [ ] GitHub writes use blob `sha`
- [ ] No tokens or secrets ever written into the store
