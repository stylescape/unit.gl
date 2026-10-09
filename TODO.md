# unit.gl TODO

Open work left after the bug sweep of 2026-10-07/08. What was fixed is in `CHANGELOG.md` under `[Unreleased]` (Fixed / Changed). `[ ]` = not done, or not verified; the note on the line says which.

## Release

- [ ] Release 0.3.6 (push tag `v0.3.6`). Bump the version in `package.json`. `npm run build` syncs `CITATION.cff` and `VERSION`; the template context version in `kist.yml` (`v0.3.5`) and `src/jinja/index.json` still need a manual bump.
- [ ] After the release, unpin `unit.gl` 0.3.3 in `kodw-buurtbasis` (see its `TODO.md`). This also needs a stylescape release (see `stylescape/TODO.md`). A scratch compile on 2026-10-08 showed that stylescape's current `src/scss` compiles cleanly against both unit.gl 0.3.5 and this sweep.

## Check in a browser

The other docs-site checks passed in headless Chromium on 2026-10-09 (mobile display-settings menu, 768-899px sidebar, overlays covering and scrolling with the page, dark mode without a light flash and with `aria-pressed`, paper select/scale/code sample, guide-baseline demos, layers buttons); see `CHANGELOG.md` for the fixes they led to.

- [ ] `injectDPR` when a window moves between displays of different DPR at the same CSS size. With a viewport change, `--dpr` follows every DPR tried (1.25, 2.625, 2, 1.5, 3, 1.75, 1). A same-size DPR change cannot be checked in Chromium emulation: `Emulation.setDeviceMetricsOverride` does not fire `matchMedia` change events, so it needs a real second display.
- [ ] The docs pages use the vendored stylescape 0.4.1, whose accent (`#3696c1`) carries white text at 3.3:1 (badges, `.is-active` buttons; axe `color-contrast` on every page). stylescape 0.5.1 (on npm) darkens it; update the docs' stylescape and re-run axe.
- [ ] axe on `scale.html` and `breakpoints.html` (2026-10-09): `heading-order` (card `h4` after `h2`), `scrollable-region-focusable` (code blocks without a tab stop) and `color-contrast` on `.modular-item__ratio` and the stat title. The other pages were not audited.
- [ ] Paper page: every format is drawn at one shared scale (the largest format fills the preview), so q12 is about 2 px wide. That keeps sizes comparable; decide whether small formats need a zoomed view.

## Needs a decision

- [ ] `$device_map` desktop entries (`microsoft_laptop`, `macbook_air`, `macbook_pro`, `imac`, `surface_book`, `dell_xps`, `lenovo_thinkpad`) hold physical pixels in `max-width`. Switching to CSS px makes min and max (nearly) equal, i.e. exact-width queries. Pick a meaning for desktops.
- [ ] `$device_map` entries not verified: `sony_xperia_1` (384×643 looks wrong for a 21:9 panel) and `samsung_s10` (DPR 3 at FHD+, 4 at WQHD+).
- [ ] `$paper_sizes` photo R+ sizes: `photo_20r_plus` 20×28in (S20R is often 20×30), `photo_24r_plus` 24×35.5in (S24R 24×36), and `photo_22r` 20×29.5in (its short side does not match "22R"). Sources disagree; confirm against the reference you use.
- [ ] `$paper_sizes` `jis_c0`–`jis_c10`: JIS P 0138 only defines the A and B series, so these are ISO C copies labelled JIS. `ansi_b` / `us_ledger` at 11×17 portrait is Tabloid; Ledger is 17×11. Rename or document.
- [ ] `doc/sass/` (the API reference shipped with the mkdocs site) is an old sassdoc build that nothing refreshes; `npm run docs:scss` writes to `dist/sassdoc` (served by the dev docs site). Either regenerate it into `doc/sass` at release time or drop it.
- [ ] `doc/overrides/_main.html` is never used: Material only picks up `main.html`. Rename it to enable the announcement banner, or delete it.
- [ ] Guide mixins still default to the deprecated `baseline()`. Moving them to `line()` would ignore a configured `$line_scale`, so that needs a decision on the deprecation first.

## Next major (breaking)

- [ ] Remove the deprecated aliases: `linear_interpolation()` (and its unused `$actual` parameter), `scale_dynamic_clamp()`, `baseline()` / `$baseline_scale`, and the `peptatonic` key in `$scale_musical`.

## Upstream

- [ ] `hue.gl` 0.1.2 on npm lists its build tools (`@getkist/action-nunjucks`, `@getkist/action-sass`) as runtime dependencies. Since unit.gl now depends on `hue.gl`, every unit.gl install pulls them in. Already fixed on `hue.gl` `dev`; needs a release (see `hue.gl/TODO.md`).
- [ ] `npm run docs:scss` preloads `scripts/sassdoc-marked-shim.cjs` because `sassdoc-extras` 3.0.0 calls `marked()` as a function, which marked ≥ 4 no longer is. Drop the shim and the `marked` override once sassdoc-extras supports a current marked.
