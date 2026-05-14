# Changelog

All notable changes to **unit.gl** are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

Reset opting out (only relevant if you depended on the old verbose reset
zeroing every legacy element):

```scss
// Suppress the new modern reset entirely
@use "unit.gl" with ($enable-reset: false);  // see roadmap
// Or scope the import yourself
@use "unit.gl/scss/functions";
@use "unit.gl/scss/variables";
@use "unit.gl/scss/mixins";
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
