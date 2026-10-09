# unit.gl TODO

Open work left after the bug sweep of 2026-10-07/08. What was fixed is in `CHANGELOG.md` under `[Unreleased]` (Fixed / Changed). `[ ]` = not done, or not verified; the note on the line says which.

## Release

- [ ] Commit the sweep. All of it is uncommitted on `dev` (about 130 files, including the regenerated `src/html` pages). Build, typecheck, lint, the 33 Sass tests, sassdoc and `mkdocs build` passed on 2026-10-08.
- [ ] Release 0.3.6 (push tag `v0.3.6`). Bump the version in `package.json`. `npm run build` syncs `CITATION.cff` and `VERSION`; the template context version in `kist.yml` (`v0.3.5`) and `src/jinja/index.json` still need a manual bump.
- [ ] After the release, unpin `unit.gl` 0.3.3 in `kodw-buurtbasis` (see its `TODO.md`). This also needs a stylescape release (see `stylescape/TODO.md`). A scratch compile on 2026-10-08 showed that stylescape's current `src/scss` compiles cleanly against both unit.gl 0.3.5 and this sweep.
- [ ] `CHANGELOG.md`: everything under `[Unreleased]` from "### Added" down was already shipped in 0.3.4/0.3.5 (it is in the `v0.3.5` tag). Move those entries into versioned sections.
- [ ] `CHANGELOG.md` → Migration documents `@use "unit.gl" with ($enable-reset: false)`, but no `$enable-reset` variable exists, so that line errors. Implement the switch or remove the line.

## Check in a browser

The docs-site fixes were checked in the rendered HTML only; nothing has been looked at in a browser (`npm run dev`).

- [ ] Below 768px: the new display-settings button (`#nav-mobile-toggle`) opens `.nav__right` (theme toggle, grid toggles, indicators, GitHub link).
- [ ] 768–899px: the sidebar hamburger is visible and opens the sidebar.
- [ ] Baseline and graph overlays scroll with the content and cover the whole page. The docs CSS no longer forces `position: fixed`; `GridManager` sizes them.
- [ ] Dark mode: no flash of the light theme on load. The theme toggle sets `aria-pressed`.
- [ ] Paper page: the format select is populated, the preview size and the "Scale 1:x" label make sense, and the code sample updates.
- [ ] Guide-baseline page: the custom (2×) baseline demo renders, and both demos keep their normal height.
- [ ] Layers page: the toggle, Show All and Hide All buttons work (they no longer use inline `onclick`).
- [ ] `injectDPR`: `--dpr` updates when a window moves between displays, including fractional DPRs such as 1.25 or 2.625.

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
