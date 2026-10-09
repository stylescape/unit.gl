# Changelog

All notable changes to **unit.gl** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **Sass functions that failed on first call now work:** `line()`,
  `type_unit()`, `snap_to_line()`, `line_height_for_size()`,
  `scale_density()` (now also with fractional DPRs such as 2.625), `z()`,
  `guide--color()` and `device_media_query()`.
- **`fluid()` / `lerp()` / `fluid_type()` with mixed units.** Values are
  interpolated in px, so `fluid(1rem, 1.5rem)` now reaches 1.5rem (it grew
  by 0.5px before). The `fluid_type` mixin falls back to `fluid()` for
  mixed units instead of emitting nothing.
- **`@use "unit.gl" with (…)`** now works for `$q`, `$reference_dpi`, the
  breakpoints, the maps (`$format_overrides`, `$layer_map`, …) and the guide
  colours; it failed with "already loaded" or "not declared with !default".
- **All `set_*` setter mixins** compile and emit valid property names
  (`padding-top`, not `padding_top`).
- **Utility cascade order.** Shorthand, axis and side classes are emitted
  in that order, so `.p_q8.pt_q4` applies `pt_q4` (also margin, gap, border,
  radius, inset and logical variants). `translate_x_*` and `translate_y_*`
  now combine instead of overriding each other.
- **Sequences and math:** `is_prime()`, `factorial(0)`,
  `sequence_catalan(0)`, `sequence_superfactorial(0)`,
  `sequence_geometric(0)` and `sum()`/`avg()` around zero return correct
  values; Fibonacci and Lucas are iterative (no exponential compile time).
- **Data:** `$format_breakpoint_map` landscape entries were one format off;
  `bronze_ratio` (3.303), `super_golden` (1.466) and the augmented and
  diminished intervals (12-TET) have correct values; `$scale_classic`
  holds lengths instead of the string `q(6)`; business cards are stored
  portrait like every other paper size; several phone/tablet entries in
  `$device_map` are corrected.
- **Invalid CSS:** quoted `container-name`, the `grid_baseline` gradient,
  duplicate declarations, the disabled-button cursor, `guide--centered`
  ignoring its height, `guide--margin` overflowing, and the centred graph
  guide being half a column off.
- **`unit.gl/formats`** entry compiles (it pointed at a missing file).
- **JavaScript runtime:** importing the package outside a browser no longer
  throws; `GridManager` and `injectDPR` are real exports with generated
  types; overlays shrink with the page and update `aria-pressed`.
- **Packaging:** `sass` and type entry points point at `dist/`; `hue.gl` is a
  dependency (every Sass entry point loads it); tests run on Node 20.
- **Docs site** (checked in headless Chromium on 2026-10-09, light and dark,
  at 600, 768-899 and 1280px): the slide-in sidebar at 768-899px was placed
  by its content instead of filling the height below the header; the paper
  preview put the format name inside the sheet, where small formats are a
  few px wide (it now sits below), and the preview shrinks to fit narrow
  screens and follows window resizes; the guide-baseline rhythm examples
  reused the scale page's `.rhythm-block` bar class; best-practice cards and
  rhythm examples skipped a heading level (`h4` after `h2`); links in prose,
  sidebar section titles and the paper comparison labels were below 4.5:1.

### Changed

- **Q07 is 62.5mm everywhere**, so the `us` breakpoint is 250px (was 240px).
- **`sl` breakpoint utilities** (`.sl_*`) are generated, as documented.
- **Guides use the layer map's z-index** (`guides: 9998`, was 9999).
- **`aspect-ratio`** is emitted as an exact fraction (`16/9`).
- **`translate_*` utilities** set the individual `translate` property via
  non-inheriting `--translate-x` / `--translate-y`, so they no longer
  replace a `transform` set elsewhere.
- **`body` is no longer fixed to `height: 100%`**; it keeps
  `min-height: 100%` so it grows with its content.
- `peptatonic` is renamed `heptatonic` in `$scale_musical`; the old key is
  kept as a deprecated alias.
- `lerp()` / `fluid()` with unitless values now raise an error (they
  produced invalid CSS before).

## [0.3.5] - 2026-08-18

### Fixed

- **Packaging:** 0.3.4 was published from `dist/`, so its `exports`
  (`./dist/…`) pointed at paths missing from the tarball. 0.3.5 is published
  from the repository root, so the tarball layout matches the repository.

## [0.3.4] - 2026-08-18

### Added

- **CSS custom-property token layer.** A new `:root { --q-0 … --q-256 }` block
  is emitted from `src/scss/classes/_tokens.scss`. Tokens mirror the curated
  `$q_steps` map and let consumers reference Q values from JS, inline styles,
  or runtime theming.
- **Standalone `tokens` entry.** `@use "unit.gl/tokens";` emits only the
  custom-property layer, no utility classes.
- **Container-query mixins.** `src/scss/mixins/_container.scss` exports
  `container()`, `container-up()`, `container-down()`, `container-between()`
  and `container-only()` reusing the canonical `$breakpoints` ladder.
- **Container-query utility classes** (opt-in). Set
  `$container_breakpoints: (sm, md, lg)` when using the `utilities` entry
  to emit `.c-md_p_q4`, `.c-lg_inset_q8`, etc.
- **Logical-property utility variants** (opt-in). Set
  `$enable_logical: true` to emit RTL/i18n-friendly classes
  (`.p_inline_q4`, `.p_block_start_q4`, `.m_inline_end_q4`,
  `.inset_block_q4`, …).
- **Stylelint setup.** `.stylelintrc.cjs` extends
  `stylelint-config-standard-scss`, bans legacy global Sass functions, and
  enforces the project's modular conventions.
- `npm run lint:scss` and `lint:scss:fix` scripts.
- **Sass sub-entries** `unit.gl/functions`, `unit.gl/variables`,
  `unit.gl/mixins` and `unit.gl/scss/*`.

### Changed

- **`classes/_utilities.scss` rewritten as a generator.** The hand-rolled
  ~1500-line file is now ~120 lines that loops `_all-utilities()` over
  `$responsive_breakpoints`. The generated class surface is byte-equivalent
  to the previous output.
- **All `*-utilities` mixins accept a `$prefix` parameter.** Used by the
  generator to emit responsive (`md_p_q4`) and container (`c-md_p_q4`)
  variants from a single source.
- **Modern reset.** `src/scss/_reset.scss` is rebuilt around `:where()` for
  zero specificity, drops obsolete tags (`applet`, `frame`, `acronym`, …),
  applies `font: inherit` only to form controls, and adds
  `prefers-reduced-motion` handling. CSS output shrank by ~700 lines.
- **Legacy global Sass functions converted to namespaced calls.** `map-get`,
  `nth`, `append`, `type-of`, and `map-has-key` are now `map.get`, `list.nth`,
  `list.append`, `meta.type-of`, `map.has-key` in `functions/_density.scss`,
  `_ratio.scss`, `_scale.scss`, `mixins/_format.scss`, `_display.scss`,
  `variables/_scale.scss`, and `functions/unit/_unit_functions.scss`.
- **Tightened npm package.** `package.json#files` now ships only the `dist/`
  payload and excludes `dist/scss/dev/**`, `dist/scss/doc/**`, the docs
  CSS bundles, and the HTML preview pages.

### Removed

- **`src/scss/mixins/_breakpoints.scss`.** The Tailwind-style duplicate
  breakpoint module (`xs/sm/md/lg/xl/2xl`, used legacy `map-get`/`map-keys`)
  is gone. The canonical `$breakpoints` map in `variables/_view.scss`
  (`us/ss/xs/sm/md/lg/xl/sl/ul`) and `mixins/breakpoint()` are the single
  source of truth.

### Migration

If you were importing the deleted module:

```scss
// Before
@use "unit.gl/scss/mixins/breakpoints" as *;
.card { @include breakpoint-up(md) { ... } }

// After
@use "unit.gl" as *;
.card { @include breakpoint(md) { ... } }
```

To leave out the reset (only relevant if you depended on the old verbose
reset zeroing every legacy element), load the parts you need instead of the
main entry:

```scss
@use "unit.gl/functions";
@use "unit.gl/variables";
@use "unit.gl/mixins";
@use "unit.gl/scss/classes";
```

To use the new opt-in features:

```scss
@use "unit.gl/utilities" with (
    $enable_logical: true,                  // RTL/i18n classes
    $container_breakpoints: (sm, md, lg)    // .c-md_p_q4, …
);
```

For runtime token access only:

```scss
@use "unit.gl/tokens";
// :root now exposes --q-0 … --q-256
```

[Unreleased]: https://github.com/stylescape/unit.gl/compare/v0.3.5...HEAD
[0.3.5]: https://github.com/stylescape/unit.gl/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/stylescape/unit.gl/compare/v0.3.3...v0.3.4
