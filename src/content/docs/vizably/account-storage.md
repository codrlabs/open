---
title: Account storage
description: Vizably keeps no database — a user's account lives in a GitHub repo or Drive folder they already own.
sidebar:
  order: 3
---

Vizably runs **no database of its own**. A signed-in user's entire account —
profile, settings, saved scans — lives in storage they already own: one GitHub
repository, or one Google Drive folder.

OAuth is used only to *identify* the user and obtain an API token. The
user-owned store is the source of truth.

Two things fall out of that. The product costs almost nothing per user to
operate, which is what makes it viable to offer for free. And the account is
portable — it moves between devices, and it survives Vizably.

## The connection flow

**Browse → select → validate → load or init.**

1. The user connects GitHub or Google via OAuth.
2. They see storage they already have and pick one. GitHub repositories are
   listed by the backend; Drive uses the client-side Google Picker, because the
   `drive.file` scope cannot browse existing folders.
3. Vizably runs a **fit-check** against the selection.
4. Vizably either loads the existing account or initialises the store.

## On-disk layout

Rooted at the repository root, or the selected Drive folder:

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
- **Record stable provider ids**, not names — repository node id, Drive folder
  id, owner id. Names change; ids do not.
- **`schemaVersion` is for breaking changes.** A companion
  `minReaderSchemaVersion` lets a newer writer mark a store unreadable by
  too-old clients, so an old client reports "incompatible" instead of corrupting
  the store.
- **Caches never block a load.** If `summary` disagrees with `scans/`,
  reconcile — do not fail.
- **Never store OAuth tokens, refresh tokens, API keys or any secret.** Tokens
  are encrypted at rest in the session (AES-256-GCM) and never written to the
  user's repository or folder.

## The fit-check

Given a selected storage, the backend returns a status, an optional reason, and
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
  and retry.
- **Drive has no multi-file transaction.** Write the immutable scan file first,
  so truth is never lost, then update the caches using ETag or generation
  preconditions and let load-time reconciliation heal any gap.

## Identity and disclosure

**Identity is possession-based by default:** whoever can read and write the
store can load the account. The storage ACL *is* the account ACL. That is a
deliberate trade and it needs saying out loud in the UI, not just in docs.

Two other things must be disclosed in the interface rather than buried:

- GitHub's OAuth `repo` scope is all-or-nothing — it cannot be narrowed to a
  single repository.
- Deleting a scan removes the file and refreshes the caches, but **GitHub
  history may still contain the deleted blob** unless history is rewritten. Do
  not claim permanence you cannot deliver.

## Implementer checklist

- [ ] Manifest written with a random `account.id` and stable provider ids
- [ ] Scan files immutable, named `<scanId>_<host>.json`, id is a UUID
- [ ] `index.json` and `summary` treated as caches, rebuilt on load
- [ ] Fit-check returns status, reason and capabilities
- [ ] `init` revalidates and conditionally creates the manifest
- [ ] GitHub writes use blob `sha`; Drive writes use generation or ETag
- [ ] No tokens or secrets ever written into the store
