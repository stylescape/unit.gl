# unit.gl TODO

Open work left after the bug sweep of 2026-10-07/08. What was fixed is in `CHANGELOG.md` under `[0.3.6]` (Fixed / Changed). `[ ]` = not done, or not verified; the note on the line says which.

## Release

- [ ] After the release, unpin `unit.gl` 0.3.3 in `kodw-buurtbasis` (see its `TODO.md`). This also needs a stylescape release (see `stylescape/TODO.md`). A scratch compile on 2026-10-08 showed that stylescape's current `src/scss` compiles cleanly against both unit.gl 0.3.5 and this sweep. **2026-10-10:** 0.3.6 released (see `CHANGELOG.md`); the kodw-buurtbasis migration to stylescape 0.5 is in progress in that repo by another session, so the unpin is left to it.

## Check in a browser

The docs-site checks passed in headless Chromium on 2026-10-09 (mobile display-settings menu, 768-899px sidebar, overlays covering and scrolling with the page, dark mode without a light flash and with `aria-pressed`, paper select/scale/code sample, guide-baseline demos, layers buttons); see `CHANGELOG.md` for the fixes they led to. On 2026-10-10, with stylescape 0.5.1 vendored, axe (theme set before load) reported no violations on all 19 pages, light and dark, at 1280 and 600px.

- [ ] `injectDPR` when a window moves between displays of different DPR at the same CSS size. With a viewport change, `--dpr` follows every DPR tried (1.25, 2.625, 2, 1.5, 3, 1.75, 1). A same-size DPR change cannot be checked in Chromium emulation: `Emulation.setDeviceMetricsOverride` does not fire `matchMedia` change events, so it needs a real second display. **2026-10-10:** still open; no second display available to check it.

## Next major (breaking)

- [ ] Remove the deprecated aliases: `linear_interpolation()` (and its unused `$actual` parameter), `scale_dynamic_clamp()`, `baseline()` / `$baseline_scale`, and the `peptatonic` key in `$scale_musical`. **2026-10-10:** left for the next major; 0.3.6 is a patch release and nothing forces a breaking 0.4 now.

## Upstream

- [ ] `hue.gl` 0.1.2 on npm lists its build tools (`@getkist/action-nunjucks`, `@getkist/action-sass`) as runtime dependencies. Since unit.gl now depends on `hue.gl`, every unit.gl install pulls them in. Fixed in hue.gl 0.2.0. **2026-10-10:** hue.gl `v0.2.0` is tagged, but its npm publish failed (CI token not accepted, see `hue.gl/TODO.md`), so unit.gl 0.3.6 still depends on `hue.gl ^0.1.2`. Bump to `^0.2.0` once it is on npm.
- [ ] `npm run docs:scss` preloads `scripts/sassdoc-marked-shim.cjs` because `sassdoc-extras` 3.0.0 calls `marked()` as a function, which marked ≥ 4 no longer is. Drop the shim and the `marked` override once sassdoc-extras supports a current marked. **2026-10-10:** still needed; sassdoc-extras is still 3.0.0 (last published 2022).
- [ ] stylescape 0.5.1 hardcodes white footer text (`.ss-c-footer { background: #000; color: #fff }`, `.ss-c-footer-brand-name`, `.ss-c-footer-legal a`) next to a themed `background-color`, so the footer is white on light grey (1.2:1) in light mode. unit.gl overrides this in `src/scss/doc/_docs.scss`; drop the override once stylescape fixes it (see `stylescape/TODO.md`).
