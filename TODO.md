# Codrlabs Open — task list

Site: **https://open.codrlabs.com** — GitHub Pages, deployed by GitHub Actions on
push to `main`, HTTPS enforced (since 2026-09-10) · Repo: **codrlabs/open**
(public since 2026-09-10)
Local: `open-solutions/open in the codrlabs workspace`

Docs hub for the Codrlabs open-solutions work — unpaid, mentoring-driven
projects. Built with Astro + Starlight. First project documented: **Vizably**.

---

## Done

- [x] Scaffold Astro + Starlight `[verified]` — `npm create astro@latest open -- --template starlight`;
      `astro@^7.2.10`, `@astrojs/starlight@^0.42.0` in `package.json`.
- [x] Decide repo name `open` `[verified]` — org prefix already says `codrlabs`;
      maps 1:1 to `open.codrlabs.com`; scales to `docs.`/`labs.` later.
- [x] Site config — title, `site:` URL, social link, Vizably sidebar `[verified]` — `astro.config.mjs`.
- [x] Landing page introducing the initiative `[verified]` — `src/content/docs/index.mdx`.
- [x] Starlight example pages deleted `[verified]` — `src/content/docs/{guides,reference}/` removed.
- [x] Vizably overview stub `[verified]` — `src/content/docs/vizably/overview.md`.
- [x] Org creation is not scriptable `[verified]` — `gh org --help` lists only
      `list`; github.com REST has no create-org endpoint (GHES only). Must be
      done at https://github.com/organizations/plan.
- [x] **Decided: one org, `codrlabs`** (2026-09-09) `[verified]`. A separate
      `codrlabs-open` org was considered and rejected: the org is already named
      "Codrlabs Open" with `open@codrlabs.com`, and every repo in it is open
      source, so a second org bought only duplicate settings and a transfer.
      `[falsified]` — the earlier claim that a second org was needed for access
      boundaries rested on a false premise.
- [x] Build passes `[verified]` — `npm run build` → 5 pages in 22.02s. Two
      benign warnings: empty `i18n` collection, no custom 404 entry.
- [x] Repo created private + pushed `[verified]` — `gh repo view codrlabs/open`
      → `codrlabs/open | PRIVATE | https://github.com/codrlabs/open`, commit
      `da0cffb` on `main`.
- [x] README rewritten for this project `[verified]` — replaced the Starlight
      starter-kit README.
- [x] Re-added repo links in the Vizably docs `[verified]` —
      `src/content/docs/vizably/overview.md`.
- [x] **Branded as Codrlabs** (2026-09-09) `[verified]`. Site title is
      `codrlabs`, not "Codrlabs Open". Logo is the org avatar
      (`gh api orgs/codrlabs --jq .avatar_url` → user `153514236`), saved to
      `src/assets/codrlabs-open.png` and `public/favicon.png`; Astro's default
      `favicon.svg` and Starlight's `houston.webp` deleted.
- [x] **Brand palette + fonts taken from codrlabs.com** `[verified]` — pulled
      from its own stylesheet (`/_next/static/chunks/24e42c30e2cd64d4.css`):
      magenta `#ac0c90`, teal `#00bfaf`, orange `#e37343`, amber `#f6bd51`,
      darks `#15151f`/`#0e0e16`/`#2a2a3a`. Fonts Plus Jakarta Sans (display) +
      DM Sans (body). Wired in `src/styles/brand.css`.
- [x] **All org repos in the nav, not just Vizably** `[verified]` —
      `gh repo list codrlabs` returns 4: `open` (private, this site),
      `vizably` (active), `corspat` (**archived**), `tympy` (**archived**).
      Pages: `projects/all`, `projects/corspat`, `projects/tympy`.
- [x] Homepage rebuilt around mentoring `[verified]` — `src/content/docs/index.mdx`
      leads with mentoring/open-development, then projects. New
      `start/mentoring.md`.
- [x] Duplicate `<title>codrlabs | codrlabs</title>` fixed `[verified]` — `head`
      override in `index.mdx`; now `codrlabs — building and mentoring in the open`.
- [x] Build after rebrand `[verified]` — `npm run build` → 9 pages in 2.31s,
      only the two benign warnings.

- [x] **Adopted `starlight-theme-rapide`** (2026-09-09) `[verified]` — peer dep
      `@astrojs/starlight >=0.42.0`, published 2026-09-02. It derives all colour
      from `--sl-hue-base` / `--sl-hue-accent` in OKLCH and ships both light and
      dark branches, so branding is two hue values, not a token set.
      Brand hues measured from the real colours: `#15151f` → H 284.5 (base),
      `#ac0c90` → H 337.8 (accent).
- [x] **Light-theme bug fixed** `[verified]` — the old `brand.css` defined light
      tokens only under `:root[data-theme='light']`, never under
      `@media (prefers-color-scheme: light)`, which is the branch Starlight
      actually uses (confirmed in the built CSS). An auto-theme visitor on a
      light OS got dark tokens in a light layout. Rapide handles both.
- [x] **Logo trimmed** `[verified]` — the org avatar was a 400×400 box holding a
      286×286 mark, i.e. ~28% transparent padding. That shrank the header mark
      and read as an oversized gap before the wordmark. Now
      `src/assets/codrlabs-mark.png` at 308×308; favicon regenerated at 512×512.
- [x] **Header/hero defects fixed** `[verified]` via screenshot comparison
      against starlight.astro.build: wordmark was pink because Starlight defaults
      `.site-title` to `var(--sl-color-text-accent)`; hero gradient ran
      orange→teal and interpolated through blue, a colour not in the palette;
      rapide hardcodes the primary hero button to its green family regardless of
      accent. All three overridden in `src/styles/brand.css`.
- [x] **Discord in the header** `[verified]` — `astro.config.mjs` social links.
- [x] **Deployed to Cloudflare Pages** `[verified]` — project `codrlabs-open`,
      live at https://codrlabs-open.pages.dev. `wrangler` is authenticated with
      `pages (write)`.
- [x] **Internal hostname scrubbed from history** `[verified]` — it had reached
      `TODO.md` in 3 commits. `git filter-branch` + force-push with an explicit
      lease; `git grep` across all revisions now returns 0.

## Finalize checklist — do these in order

Status as of 2026-09-10.

1. [ ] **Vizably LICENSE — belongs to the vizably effort, not this repo.**
       `[verified]` `codrlabs/vizably` has none (`corspat` and `tympy` are MIT),
       so vizably is source-available rather than open source until it gets one.
       Under the scope rule below, this is not actioned from here.
2. [x] **`open.codrlabs.com` live on Cloudflare Pages** `[verified]` — domain
       fully `active` (verification + validation) at 02:45:08, HTTPS via edge
       200. The one machine that could not load it was this PC: its first DNS
       server is a resolver on the local network holding a cached NXDOMAIN from
       before the record existed (Cloudflare SOA, negative-cache TTL 1800s). It
       expires on its own; over a VPN the site loads, as you confirmed.
       **Superseded 2026-09-10 by the move to GitHub Pages** — see the migration
       section under Open. This Cloudflare setup stays live until cutover.
       Earlier state: DNS record added; site serving; Pages validation
       still finishing. Update 2026-09-10 `[verified]`: you added the record.
       Cloudflare's authoritative NS returns proxied anycast IPs
       (`104.21.0.178`, `172.67.128.42` + AAAA), and so do 1.1.1.1 and 8.8.8.8.
       Pages verification flipped to `active`; validation `pending` (HTTP method,
       Google CA). Straight to the edge (`curl --resolve …:104.21.0.178`),
       `https://open.codrlabs.com/` returns **HTTP 200** with the current build,
       and `http://` 301-redirects to HTTPS. The one machine that could not
       resolve it was this PC — NXDOMAIN even after `Clear-DnsClientCache`,
       while public resolvers answered. Being diagnosed.
       Original entry: one DNS record left. The domain is registered
       on the Pages project, status `pending`, validation error
       `CNAME record not set`.
       Next (you): Cloudflare → `codrlabs.com` → DNS → Add record →
       `CNAME` · name `open` · target `codrlabs-open.pages.dev` · Proxied.
       Validation and the certificate then complete on their own.
       Cannot be done from here `[verified]`: the wrangler OAuth token resolves
       the zone but gets `Authentication error` (code 10000) even *listing* DNS
       records. `[unverified]` that your other Pages subdomains use proxied
       records — could not read them to check; proxied is Cloudflare's default
       for Pages.
       Verify: `Resolve-DnsName open.codrlabs.com -Server 1.1.1.1`
3. [x] **`codrlabs/open` is public** `[verified]` — see Done.
4. [x] **`editLink` enabled** `[verified]` — see Done.
5. [ ] **Have a lawyer read `start/fine-print.md`.** It is written as a plain
       description and says so, but it describes an unpaid mentoring
       arrangement and how academic-credit placements work, for a company in Canada. Unpaid-work and
       worker-classification rules are jurisdiction-specific and this has had
       no legal review.
6. [ ] **Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`** to the org.
       `[verified]` neither exists in any repo. The fine-print page currently
       admits this gap in a visible callout — remove that callout once closed.

- [x] **Renamed to "Codrlabs Open"** (2026-09-10) `[verified]` — navbar title in
      `astro.config.mjs`; screenshot confirms. `[falsified]` as a claim that the
      rename was complete: the homepage hero and browser-tab title still said
      "Codrlabs". Finished later the same day — see "Rename finished" below.
- [x] **Practices section written from vizably's docs** (2026-09-10) `[verified]` —
      18 pages build. Distilled from `docs/guides/{thinking-in-architecture,
      architecture-mental-model,workflow,reviewing}.md` and `docs/README.md`:
      `practices/{index,layered-architecture,pull-requests,reviewing,
      git-recovery,documentation}.md`. Generalised away from vizably specifics
      so it applies org-wide.
- [x] **Vizably docs written** `[verified]` — `vizably/architecture.md` (layers,
      folder map, composition root, where-to-look-when-X-breaks) and
      `vizably/account-storage.md` (portable account, fit-check, concurrency),
      from `docs/plans/architecture-map.md` and
      `docs/guides/auth_storage_guide/accountStorageContract.md`.
- [x] **LICENSE added before going public** (2026-09-10) `[verified]` — MIT,
      matching `corspat`/`tympy`. The repo had none, which contradicted the
      fine-print page's own "check for a licence before contributing" advice.
      `gh api repos/codrlabs/open/license` → `MIT` (detection lagged a few
      seconds behind the push; an immediate `gh repo view` said `none`).
- [x] **Pre-public sweep** `[verified]` — `git grep` for keys/tokens/private
      keys in tracked files: only prose hits (CSS "tokens", review checklist).
      All revisions: 0 hits for internal hostnames, `.local`, private IP ranges.
      30 tracked files, all expected.
- [x] **Light theme verified visually** `[verified]` — screenshot of a build
      copy with `data-theme="light"` injected *after* Starlight's inline theme
      script (setting the `<html>` attribute alone is overwritten on load).
      White ground, dark text, magenta accent, legible badges.
- [x] **Repo made public** (2026-09-10) `[verified]` — `gh repo view codrlabs/open`
      → `PUBLIC`, homepage `https://open.codrlabs.com`, topics `astro,
      documentation, mentoring, open-source, starlight`.
- [x] **`editLink` + `lastUpdated` enabled and live** `[verified]` — production
      alias serves `github.com/codrlabs/open/edit/main/...`; that target returns
      HTTP 200 publicly.
- [x] **Custom domain registered on the Pages project** `[verified]` — `POST
      /accounts/.../pages/projects/codrlabs-open/domains` with the wrangler
      OAuth token succeeded; `pages (write)` was enough for the attach.
      `[falsified]` — the earlier claim that attaching the domain "cannot be done
      from here" was wrong for this step. It *was* right that Cloudflare would
      not create the DNS record: validation reported `CNAME record not set`.
- [x] **Rename finished** (2026-09-10) `[verified]` — homepage `title` and the
      `head` title override in `src/content/docs/index.mdx` now read
      "Codrlabs Open". Live check on `codrlabs-open.pages.dev`: `<title>`,
      header span and hero `<h1>` all read "Codrlabs Open".
- [x] **Logo alt emptied** `[verified]` — `alt: ''` in `astro.config.mjs`. The
      visible title shares the link, so `alt="codrlabs"` made screen readers
      announce "Codrlabs Codrlabs Open". Astro renders it as a bare `alt`
      attribute, which HTML treats as `alt=""`; a check grepping for the literal
      string `alt=""` falsely failed on this and blocked the deploy until the
      markup was read directly.
- [x] **Old Cloudflare test deployments deleted** (2026-09-10) `[verified]` —
      your call. Seven superseded deployments deleted via the Pages API:
      `133ab549`, `474d6683`, `b7f76404`, `a50e7a84`, `69a9f5d3`, `2521d007`,
      then `15c62329` once `3a434b87` was canonical, behind a guard that refused
      to delete the live deployment. The project now holds exactly one
      deployment, `3a434b87`. All seven hashed URLs return 404, cache-busted and
      plain. Four of them kept serving 200 for a few minutes after deletion; no
      cache headers were present, so the cause is `[unverified]`.
- [x] **Copy corrected: claims about users and production conditions** (2026-09-10). Your
      correction: Codrlabs' own products have real users, constraints and
      reviews; Codrlabs Open *simulates* those conditions to mentor.
      `[falsified]` — five claims of mine said otherwise: the homepage "Mentor
      by building" card ("real users… a live codebase") and "Solve a real
      problem" card ("nothing is built purely as a teaching exercise"),
      `start/mentoring.md` ("software that other people actually use", and
      "hosting budgets" as a real constraint), and `start/what-this-is.md`
      ("real code review on real software"). All rewritten. `start/fine-print.md`
      now says outright that the projects have no real user base, and lists
      "not production work" under what mentoring is not.
      Assumption, not confirmed: "reviews" means user/app-store reviews, which
      are simulated; code review of pull requests stays genuine.
- [x] **History rewritten** (2026-09-10) `[verified]` — to remove content that
      should not have been published, and local machine paths. What the content
      was is deliberately not recorded here. All 17 commits rewritten with
      `git filter-branch`; each removed phrase checked at 0 matches across every
      rewritten commit before force-pushing with an explicit lease. The two
      Actions artifacts built from the old commits were deleted. Existing
      clones of the old history must be re-cloned.
- [x] **Brand capitalised** (2026-09-10) `[verified]` — "Codrlabs" and
      "Codrlabs Open" in prose across 13 files (66 replacements), per your
      instruction. Lowercase kept only for identifiers: domains, emails,
      `github.com/codrlabs…` links, the org login, repo slugs, file names and
      code. Checked: 0 identifiers wrongly capitalised, 0 lowercase brand words
      left in prose; build passes with title "Codrlabs Open". GitHub repo
      description updated to match.
- [x] **Repository deleted and recreated** (2026-09-10) `[verified]` — a
      force-push leaves the old commits readable on GitHub by SHA, and the
      public events feed listed those SHAs, so rewriting history alone was not
      enough. You deleted `codrlabs/open`; it was recreated from the clean local
      history (18 commits, 0 unreachable objects). Checked after deletion: the
      old commit pages and raw files return 404, and the events feed lists none
      of the old SHAs. Restored: public visibility, description, homepage,
      topics, Pages with `build_type=workflow`, custom domain
      `open.codrlabs.com`, HTTPS enforced — GitHub kept the approved certificate
      for the domain, so there was no certificate wait. Actions history,
      artifacts and deployments from the old repository went with it. This
      supersedes the force-push described in "History rewritten" above; anyone
      holding an old clone must re-clone.
- [x] **Page renamed "The fine print"** (2026-09-10) `[verified]` — it was
      "The platform", which collided with platform.codrlabs.com, a separate
      Codrlabs site. File moved to `src/content/docs/start/fine-print.md`;
      sidebar label, homepage link and TODO pointers updated; "how the platform
      works" in `practices/documentation.md` now reads "how Codrlabs Open
      works". Build check: `/start/fine-print/` built with title "The fine print
      | Codrlabs Open", no `/start/platform/` route, sidebar shows "The fine
      print" with 0 old labels or links. The only "platform" left in built HTML
      is Starlight's search-shortcut script (`navigator.platform`); a
      visible-text pass found none. In this file, `/start/platform/` survives
      only inside an earlier dated check, and the other site's project is the other
      site's own project. No redirect from the old URL, on purpose: the site is
      new, has no archived captures, and a redirect would keep "platform" in its
      URL space.

## Open

- [ ] **Organization profile README** (asked 2026-09-10). `[verified]` against
      GitHub's "Customizing your organization's profile" docs: a public org
      README comes from a public repo named `.github`, file `profile/README.md`;
      a members-only one from a private `.github-private` repo at the same path.
      Pins are separate (up to six public, six for members) and only an org
      owner can set them, in the UI. Before starting, neither repo existed and 0
      repos were pinned, which is why the public view led with the two archived
      repos. Testing it now; you keep the repo if it works, otherwise delete it.
      **Works** `[verified]` 2026-09-10: public repo `codrlabs/.github` created,
      `profile/README.md` committed (`0468c3b`). The draft passed every check
      before publishing: no "platform", no personal details, no diminishing
      phrasing, brand capitalised, all 15 links 200. A logged-out request to
      github.com/codrlabs showed the README text at 17:05:36.
      Still yours:
      - **Pin repositories** — UI only. GitHub's GraphQL has pin mutations for
        environments, issues and issue comments, none for repositories.
        Suggested: `vizably` and `open`, so archived repos stop leading.
      - **Keep or delete** `codrlabs/.github`, per your test.
      Options, not done: a members-only README (private `.github-private`,
      `profile/README.md`); and org-wide default `CONTRIBUTING.md`,
      `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md` and issue/PR templates,
      which this same `.github` repo can provide for every repo that lacks its
      own — directly relevant to finalize item 6.
- [x] **AI assistance section** (asked 2026-09-10). Guidance on using AI as a
      developer, and specifically while learning or contributing voluntarily,
      grounded in research rather than opinion. Starting point you gave: Lars
      Faye, "AI coding will prevent expertise"
      (https://larsfaye.com/articles/ai-coding-will-prevent-expertise).
      **Written** `[verified]` — sidebar group "AI assistance" with four pages:
      `ai/index` (principle, evidence table, limitations), `ai/learning`,
      `ai/working`, `ai/contributing`. A homepage card, a mentoring bullet and a
      contributing step link into it. Every figure was checked at its primary
      source: Anthropic (Shen & Tamkin 2026; 52 developers; quiz 50% vs 67%),
      Bastani et al., PNAS 2025 (~1,000 students; practice +48% / +127%, exam
      −17% for unrestricted GPT-4), Prather et al., ICER 2024, METR 2025 (16
      developers; 19% slower while believing they were 20% faster), Perry et al.,
      CCS '23, Spracklen et al., USENIX Security 2025 (5.2% / 21.7%), Lee et al.,
      CHI 2025 (319 workers), Stack Overflow 2025, DORA 2025, and GitClear 2025
      (correlational, and stated as such). Secondhand figures that did not
      survive checking were left out: Anthropic's "17% lower" is 17 percentage
      points; a "47% drop in debugging" is not in the study; GitClear's "4x/8x"
      clone figures are not what its report measures. Build: 22 pages, 597
      internal links, 0 broken. Every external source link loads; PNAS blocks
      automated requests, so Bastani is linked through its PubMed Central
      open-access copy.
      **Policy choices made on your behalf — confirm or change:** contributors
      say how AI was used in the pull request description, and wholesale
      agent-generated pull requests the author cannot walk through are sent back
      (`ai/contributing`).
- [x] **Stop framing Codrlabs Open by what it lacks** (asked 2026-09-10). Copy
      saying "no real user base", "no real users here" or "not production work"
      diminished it. Reframed around what is true and positive — real codebases,
      mentoring against conditions drawn from Codrlabs' production work —
      without claiming users it does not have. **Done** `[verified]`: homepage
      cards "Mentor by building" and "Held to production standards" (was
      "Simulate the real thing"), the mentoring intro and constraints bullet,
      what-this-is point 2, and the fine-print paragraph and scope bullet (now
      "not work on Codrlabs' commercial products"). Re-sweep of site copy for
      "no real user", "not production", "user base", "simulat" → 0 matches.

### Migration to GitHub Pages (decided 2026-09-10, your call)

The repo is public now, which removes the only reason GitHub Pages was ruled
out — on the org's Free plan, Pages serves public repos only. Order matters:
the Cloudflare site stays live until GitHub Pages is verified serving, so there
is no gap.

- [x] Workflow `.github/workflows/deploy.yml` (build with `withastro/action`,
      publish with `actions/deploy-pages`), `public/CNAME`, Pages enabled with
      `build_type=workflow`, custom domain set on the repo. `[verified]`
      2026-09-10: `gh api repos/codrlabs/open/pages` → `build_type: workflow`,
      `cname: open.codrlabs.com`, `https_enforced: false` — expected until
      GitHub issues a certificate, which needs DNS pointing at GitHub. Actions
      were already allowed on the repo (`allowed_actions: all`), so no org-wide
      setting was touched. Actions pinned to the upstream example's majors:
      `actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`
      (latest v7.0.1 / v6.1.2 / v5.0.1). Checkout uses `fetch-depth: 0` so
      `lastUpdated` dates come from real history. `paths-ignore` skips
      redeploys for commits touching only `TODO.md`, `README.md` or `LICENSE`.
- [x] First workflow run green, and the site verified on GitHub's Pages IPs
      *before* any DNS change. `[verified]` 2026-09-10: run `34459450874` →
      `build` and `deploy` both `success`. With `--resolve` to `185.199.108.153`:
      `/`, `/practices/`, `/start/platform/` → 200; title and hero read
      "Codrlabs Open"; `Server: GitHub.com`; a built `/_astro/*.css` → 200, so no
      base-path breakage; `codrlabs.github.io/open/` → 301 to the custom domain.
      No CAA records on `codrlabs.com` or `open.codrlabs.com` (Cloudflare DoH),
      so Let's Encrypt can issue. GitHub health check pre-switch: valid,
      proxied, not yet pointed at GitHub, `caa_error: null`.
      `[falsified]` — the section intro's "there is no gap": content stays up,
      but `https://` shows a certificate warning between the DNS switch and
      GitHub's Let's Encrypt issuance (minutes, up to about an hour). Avoiding
      it would need zone-wide SSL changes to `codrlabs.com`, which the
      minimal-footprint rule rules out.
- [x] **You:** change the `open` record to `CNAME codrlabs.github.io`,
      **DNS-only (grey cloud)**, so GitHub can issue its certificate.
      **Done** (2026-09-10) `[verified]`: Cloudflare DoH returns
      `CNAME codrlabs.github.io.` → `185.199.108–111.153`; the watcher saw the
      switch at 03:49:15. GitHub health: `is_proxied: false`,
      `is_cname_to_github_user_domain: true`, `is_https_eligible: true`.
      Earlier the same day it was half done — target changed, proxy still on;
      GitHub then reported `is_proxied: true`, `is_https_eligible: false`.
- [x] Certificate issued → set `https_enforced: true`. **Done** (2026-09-10)
      `[verified]`. GitHub did not start issuing on its own: the certificate
      stayed `none` from the DNS switch at 03:49 until 04:02, and in that window
      `https://` served GitHub's `*.github.io` certificate — the broken SSL you
      saw. Removing and re-adding the custom domain on the repo triggered it:
      `authorized` → `approved` within ~30 s, and the watcher set
      `https_enforced: true` at 04:02:45. Checked independently afterwards:
      HTTPS with strict verification → 200 (`ssl_verify=0`), `http://` → 301 to
      `https://`, certificate `CN=open.codrlabs.com`, Let's Encrypt `YR1`, valid
      2026-09-10 → 2026-12-09 (GitHub renews it).
      Lesson: if a GitHub Pages certificate sits at `none` once DNS is correct
      and DNS-only, re-save the custom domain instead of waiting.
- [x] Remove the custom domain from the Cloudflare Pages project, then delete
      the `codrlabs-open` Cloudflare project. **Done by you** (2026-09-10).
      `[verified]` `wrangler pages project list` no longer lists
      `codrlabs-open`, and the account's other projects are
      still listed with their domains, untouched. A first check through the raw
      OAuth token was inconclusive — `Authentication error`, most likely an
      expired token — and my script had mislabelled that result as "gone";
      wrangler refreshes its own token, so its listing is the evidence.
- [ ] Recommended, **you:** verify **`open.codrlabs.com` only** for GitHub Pages
      (one TXT record — GitHub shows the exact name and value when you add the
      domain). Deliberately *not* the apex `codrlabs.com`: verifying the company
      domain in this org would tie all of `codrlabs.com` to the open org on
      GitHub. Scoping it to `open.` keeps the protection against a
      dangling-record takeover without spreading into the company domain.
      `[falsified]` — this bullet first recommended verifying the apex
      `codrlabs.com`, which is exactly the contamination you ruled out.

**Keep Codrlabs Open's footprint in company resources minimal** (your
instruction, 2026-09-10). After cutover, the whole footprint in the company's
`codrlabs.com` zone should be the `open` CNAME plus the optional verification
TXT — nothing at the apex, no org-wide GitHub settings changed, and the
`codrlabs-open` project gone from the company Cloudflare account.

- [ ] **Scan pipeline page.** `vizably/overview.md` admits it is missing.
      Reading vizably's docs for source material is fine — see the scope rule
      below; it is *editing* vizably that is out of bounds.
- [ ] **ASCII diagrams could be SVG.** The layer diagrams render as code blocks;
      legible but busy. `[unverified]` — no accessibility check done on them.

## Scope rule — do not edit the vizably repo from here

**Decided 2026-09-10.** Work in this repo never modifies
`open-solutions/vizably`. Vizably's own cleanup is a separate, later effort that
happens on vizably, and part of that effort is moving its documentation into
open.codrlabs.com. Reading vizably for source material is fine; writing to it is
not.

Two findings from reading it are therefore **logged here for that later effort,
not to be actioned from this repo**:

- 32 occurrences of `file:///c:/Users/<user>/...` in vizably's *public* docs —
  `docs/guides/getting-started.md` (2),
  one other guide (22),
  `docs/guides/thinking-in-architecture.md` (8). `[verified]` These leak a
  username and local directory layout, and the links are dead for anyone else.
  None of it was carried into this site.
- The generic guides now exist in both repos and will drift. The eventual shape:
  vizably keeps its project-specific guides, the cross-project practices live
  here, and vizably points at this site.

- [x] **Superseded 2026-09-10 → finalize checklist item 2.** Original entry:
      ~~BLOCKING: attach `open.codrlabs.com`.~~ The domain does not resolve yet.
      Cannot be done from here — the wrangler token has `zone (read)` only, and
      adding a Pages custom domain needs DNS write.
      Next (you): Cloudflare dashboard → Workers & Pages → `codrlabs-open` →
      Custom domains → Add `open.codrlabs.com`. DNS is already on Cloudflare
      (`memphis.ns` / `nia.ns`), so the CNAME and cert are automatic.
      `[falsified]` twice: the attach did *not* need DNS write (`pages (write)`
      was enough), and the CNAME was *not* created automatically when attached
      through the API — validation reported `CNAME record not set`.
- [x] **Decided 2026-09-09: Cloudflare Pages** (your choice of the recommended
      option). Original entry: Decide hosting for good: Cloudflare Pages vs GitHub Pages.
      `[verified]` GitHub Pages cannot serve this repo today — the `codrlabs`
      org is on the **Free** plan (`gh api orgs/codrlabs --jq .plan.name`), and
      Pages only serves *public* repos on Free. It would work once the repo is
      public, but it permanently couples the site being up to the repo being
      public. Cloudflare Pages is live now and is indifferent to visibility.
- [x] **Fine-print page written** `[verified]` — `src/content/docs/start/fine-print.md`,
      linked from the homepage and the sidebar. Covers: what Codrlabs Open is,
      the three ways to take part (open contribution / mentored / school
      placement), an explicit "what mentoring is not" section (not employment,
      no wage, not a job pathway, no SLA), copyright and licensing, privacy, and
      contact. Names no individual and no institution. Carries a visible "plain description, not a contract"
      callout. Still needs item 5 in the checklist above.
- [x] **Fonts self-hosted** `[verified]` — `@fontsource-variable/*` via
      `customCss`; the Google Fonts `@import` disclosed every visitor's IP to a
      third party, which contradicted the fine-print page's privacy section.
      Built output now contains 0 third-party URLs and 5 local `.woff2` files.
- [x] **Superseded 2026-09-10 — deploy-on-push now comes from GitHub Actions**
      (`.github/workflows/deploy.yml`); Cloudflare Pages is no longer used.
      Original entry: Connect Cloudflare Pages to GitHub for deploy-on-push
      (optional) — deploys are currently direct uploads via `wrangler pages deploy`.
      `[unverified]` Cloudflare does not convert a Direct Upload project to Git
      integration in place; it would mean a new Git-connected project and moving
      the custom domain onto it. Not tested.
- [x] **Self-host the fonts** — done 2026-09-09, see "Fonts self-hosted" above.
      Original entry: `src/styles/brand.css` pulls Plus Jakarta Sans
      and DM Sans from Google Fonts over the network — a third-party request on
      every page load. `[unverified]` — not measured.
      Next: `npm i @fontsource-variable/plus-jakarta-sans @fontsource-variable/dm-sans`
      and swap the `@import`.
- [ ] **SVG favicon.** `public/favicon.png` is now a 512×512 raster of the
      trimmed mark; an SVG of the node mark would be crisper and smaller.
- [x] **Verify the logo on a light background** — done 2026-09-10 `[verified]`
      by light-theme screenshot: mark and nodes clearly legible; the pale halo
      rings are faint but were never load-bearing. Original entry: The mark has
      pale halo rings that may disappear in light theme.
- [x] **Enable `editLink`** — done 2026-09-10 `[verified]`, see Done. Original
      entry: enable in `astro.config.mjs` once the repo is public — edit links
      would 404 for visitors while it is private.
- [ ] **Mentoring page operational detail** — `start/mentoring.md` deliberately
      stops short of inventing how to request a mentor, session cadence, etc.
      It carries a visible "still being written" callout until you decide.

- [ ] **Fill in Vizably docs.** Source material already exists in the vizably repo:
      `docs/plans/architecture-map.md`, `README.md`,
      `docs/guides/auth_storage_guide/*`. Decide what is public-facing vs internal
      before copying — mentorship docs are private and must not land here.
      Next: `ls ../vizably/docs/`
- [x] **Pick a host** — Cloudflare Pages, decided 2026-09-09. Original entry:
      GitHub Pages (needs `public/CNAME` + `@astrojs/` static
      output + Actions workflow) vs Cloudflare Pages vs Vercel.
- [ ] **DNS for `open.codrlabs.com`** — now tracked as finalize checklist item 2,
      which has the exact record. Original entry: CNAME record at the Codrlabs
      DNS provider pointing at the chosen host.
- [x] **Flip the repo public** — done 2026-09-10 `[verified]`, see Done.
      Original entry: Decide when to flip the repo public. Currently private.
- [ ] **Next active project.** Only Vizably is live; `corspat` and `tympy` are
      archived on GitHub and documented as such. A new project gets its own
      top-level sidebar section when it has something worth documenting.

## Ground rules

**This repo is public** (since 2026-09-10). Every commit is published — git
history is not a private scratchpad, and scrubbing it after the fact means a
force-push that breaks every clone and fork.

Nothing proprietary crosses into this repo, ever:

- No internal hostnames, IPs, server names, or infrastructure detail.
- No client names, client work, or anything under NDA.
- No private ops/runbook content, in files *or* commit messages.
- No names of contributors, mentees, or their schools without written consent —
  see the fine-print page.
- Nothing about any individual contributor's circumstances: not who they are,
  not how many people are in a given situation, not any arrangement they are
  under. Describe how things work in general, never how they stand today. In a
  small project, a count is enough to identify someone.

Already caught once: an internal Git hostname reached `TODO.md` and had to be
removed from three commits with `git filter-branch` before the repo went
public. `[verified]` — `git grep` across all revisions now returns 0 matches.

## Notes

- Dev server: `npm run dev` → http://localhost:4321
- Build check: `npm run build` — runs `astro build` only. `[falsified]` — this
  line used to say it also runs `astro check`; `package.json` has
  `"build": "astro build"`.
- Deploy: push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds
  and publishes to GitHub Pages; commits touching only `TODO.md`, `README.md` or
  `LICENSE` skip it. Manual run: Actions → Deploy to GitHub Pages → Run
  workflow.
- **Restart the dev server after adding a content file or editing
  `astro.config.mjs`.** Seen 2026-09-09: a dev server started at 18:12 kept
  reporting `The slug "start/mentoring" specified in the Starlight sidebar
  config does not exist` for a file written at 18:19. Starlight validates
  sidebar slugs against `.astro/data-store.json`, and the Windows file watcher
  had not re-scanned. The file was fine — a clean `rm -rf .astro dist &&
  npm run build` emitted all 9 pages.
  Fix: `q` + Enter in the dev terminal, `rm -rf .astro`, `npm run dev`.
