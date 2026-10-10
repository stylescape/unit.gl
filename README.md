<p align="center">
    <img src="https://raw.githubusercontent.com/stylescape/brand/master/src/logo/logo-transparant.png" width="20%" alt="Stylescape Logo">
</p>
<h1 align="center" style='border-bottom: none;'>qp</h1>
<h3 align="center">Dynamic Layout Engine</h3>

<br/>

<div align="center">

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.unit.gl&up_message=Up&up_color=%23000000&down_message=Down&down_color=%23000000&style=flat-square&logo=Firefox&logoColor=FFFFFF&label=Website&labelColor=%23000000&color=%23000000)
](https://www.unit.gl)
[![NPM Version](https://img.shields.io/npm/v/unit.gl?style=flat-square&logo=npm&logoColor=FFFFFF&label=NPM&labelColor=%23000000&color=%23000000&link=https%3A%2F%2Fwww.npmjs.com%2Funitage%2Funit.gl)](https://www.npmjs.com/unit.gl)
[![devContainer](https://img.shields.io/badge/devContainer-23354351?style=flat-square&logo=Docker&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/stylescape/unit.gl)
[![StackBlitz](https://img.shields.io/badge/StackBlitz-23354351?style=flat-square&logo=StackBlitz&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://stackblitz.com/github/stylescape/unit.gl/tree/main?file=src%2Findex.html)
[![GitHub License](https://img.shields.io/github/license/stylescape/unit.gl?style=flat-square&logo=readthedocs&logoColor=FFFFFF&label=&labelColor=%23000000&color=%23000000&link=LICENSE)](https://github.com/stylescape/unit.gl/blob/main/LICENSE)

</div>

<div align="center">

[![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=bug_report.yml)
[![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=feature_request.yml)
[![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=question.yml)
[![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=suggestion.yml)
[![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=discussion.yml)

</div>

---

<br/>

`unit.gl` is a comprehensive design toolkit focused on fluid typography, responsive design, and advanced SCSS functions. It's crafted to empower designers and developers to create harmonious, scalable, and accessible web experiences efficiently.

---

## Features

`unit.gl` provides a robust set of features for building dynamic, responsive layouts with precision and flexibility:

### Core Layout System

- **Kyū Unit System** – A base-16 measurement system (`1q = 1/16rem = 1px`) for precise, consistent spacing and sizing across all screen sizes
- **Fluid Typography** – Dynamic font scaling with `fluid_type()` mixin that smoothly interpolates between min/max sizes across viewport breakpoints
- **Modular Scale** – Musical interval-based typographic scales (minor second, golden ratio, perfect fifth, etc.) for harmonious type hierarchies
- **Baseline Grid** – Visual rhythm system with configurable baseline increments for vertical alignment

### Responsive Design Tools

- **Viewport Breakpoints** – Q format-derived breakpoint system (us, ss, xs, sm, md, lg, xl, sl, ul) with `breakpoint()` mixin for mobile-first media queries
- **Device Profiles** – Pre-configured device-specific media queries for iPhone, iPad, Samsung Galaxy, and more
- **Aspect Ratio Utilities** – Maintain proportions with `display_ratio()` mixin supporting common ratios (16:9, 4:3, golden ratio)
- **Orientation Helpers** – Landscape/portrait-specific styling with `display_orientation_*` mixins

### Advanced SCSS Functions

- **Unit Conversion** – Seamless conversion between px, rem, em with `px_to_rem()`, `rem_to_px()`, `em_to_px()` functions
- **Math Operations** – `add()`, `subtract()` with intelligent unit handling; `modular_scale()` for ratio-based scaling
- **Layer Management** – z-index token system via `$layer_map` map and `z()` function for consistent stacking order
- **Paper Sizes** – ISO (A-series, B-series), ANSI, and custom Q-series paper dimensions for print layouts

### Developer Experience

- **Modern Sass** – Uses `sass:math`, `sass:map`, `sass:color` modules; no deprecated syntax
- **TypeScript Support** – Grid utilities and layout helpers with full type definitions
- **Visual Guides** – Built-in overlay system for baseline grids, margins, and alignment verification during development
- **Customizable Variables** – Override defaults for base units, breakpoints, scales, and colors via Sass variables

## Installation

### HTML Script Tag

``` html
<script type="module" src="https://unpkg.com/unit.gl@latest/dist/js/unit.gl.js"></script>
```

### NPM Module

``` bash
npm i unit.gl
```

The Sass sources load their colour palette from `hue.gl` (installed as a
dependency) through a `pkg:` URL, so compile with Node's package importer:
bundlers such as Vite and webpack handle this, and the Sass CLI needs
`--pkg-importer=node` (or `importers: [new NodePackageImporter()]` in the JS
API).

---

## Quick Start

### Basic Usage (SCSS)

Import `unit.gl` into your Sass/SCSS files:

```scss
@use "unit.gl" as *;

// Use the Kyū unit system
.container {
  padding: q(4);        // 4q = 4 × (1/16rem) = 0.25rem = 4px
  margin-bottom: q(8);  // 8q = 0.5rem = 8px
}

// Apply fluid typography
.heading {
  // min viewport, max viewport, min size, max size
  @include fluid_type(320px, 1280px, 16px, 48px);
}

// Responsive breakpoints
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: q(4);

  @include breakpoint(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Common Layout Patterns

#### Fluid Card Grid with Consistent Spacing

```scss
@use "unit.gl" as *;

.card-grid {
  display: grid;
  gap: q(8);                          // 0.5rem spacing
  padding: q(8);

  // Mobile: 1 column
  grid-template-columns: 1fr;

  // Tablet: 2 columns
  @include breakpoint(sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: q(12);                       // 0.75rem
  }

  // Desktop: 3 columns
  @include breakpoint(md) {
    grid-template-columns: repeat(3, 1fr);
    gap: q(16);                       // 1rem
  }
}

.card {
  padding: q(12);
  border-radius: q(2);
  background: #fff;
  box-shadow: 0 q(1) q(4) rgba(0, 0, 0, 0.1);
}
```

#### Typography Scale with Modular Rhythm

```scss
@use "sass:map";
@use "unit.gl" as *;

// Use golden ratio (1.618) for harmonious type scale
$scale-ratio: map.get($interval_map, golden_ratio);

h1 {
  font-size: modular_scale(4, 1rem, $scale-ratio);  // ~6.85rem
  line-height: baseline(6);                          // 6 baseline units
  margin-bottom: baseline(2);
}

h2 {
  font-size: modular_scale(3, 1rem, $scale-ratio);  // ~4.236rem
  line-height: baseline(5);
  margin-bottom: baseline(2);
}

h3 {
  font-size: modular_scale(2, 1rem, $scale-ratio);  // ~2.618rem
  line-height: baseline(4);
  margin-bottom: baseline(1);
}

p {
  font-size: modular_scale(0, 1rem, $scale-ratio);  // 1rem
  line-height: baseline(3);                          // Vertical rhythm
  margin-bottom: baseline(2);
}
```

#### Aspect Ratio Container (e.g., Video Embed)

```scss
@use "unit.gl" as *;

.video-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  // Maintain 16:9 aspect ratio
  @include display_ratio(16, 9);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

#### Device-Specific Styling

```scss
@use "unit.gl" as *;

.app-header {
  height: q(80);  // 5rem = 80px

  // iPhone-specific adjustments
  @include device_media_query('iphone_x') {
    padding-top: env(safe-area-inset-top);  // Notch support
  }

  // Tablet landscape
  @include display_orientation_landscape {
    @include breakpoint(sm) {
      height: q(64);  // Shorter header in landscape
    }
  }
}
```

### TypeScript Integration

Importing `unit.gl` in the browser sets `--dpr` / `--dpr-inverse` on `<html>`
and wires up grid overlays: every `button[data-toggle="<name>"]` toggles the
`.guide--layer[data-grid="<name>"]` overlay, and the choice persists in
`localStorage`. During server-side rendering the import does nothing.

```html
<button type="button" data-toggle="baseline" aria-pressed="false">Baseline</button>
<div class="guide--layer guide--baseline" data-grid="baseline"></div>
```

For overlays with other markup, create a manager yourself:

```typescript
import { GridManager } from 'unit.gl';

const grids = new GridManager({
  toggleSelector: '.grid-toggle',
  gridSelector: '.grid-overlay',
  activeClass: 'visible',
});

grids.toggle('baseline');
grids.show('graph');
grids.hideAll();
```

---

## Usage Guidelines & Best Practices

### Performance Optimization

1. **Minimize Media Query Complexity**
   - Use the `breakpoint()` mixin for standard breakpoints instead of custom media queries
   - Consolidate similar breakpoint rules to reduce CSS output

2. **Leverage Sass Variables**
   - Override defaults at the top of your main stylesheet:
     ```scss
     @use "unit.gl" with (
       $q: 0.0625rem  // Customize base unit if needed
     );
     ```

3. **Selective Imports**
   - Import only the modules you need to reduce compilation time:
     ```scss
     @use "unit.gl/scss/functions" as fn;
     @use "unit.gl/scss/mixins/view" as view;
     ```

### Design System Integration

- **Consistent Spacing**: Use Kyū multiples (4q, 8q, 12q, 16q) as your spacing scale
- **Type Hierarchy**: Choose one modular scale ratio and stick with it across all typographic elements
- **Z-Index Management**: Define your layer stack in `$layer_map` map at project start
- **Breakpoint Strategy**: Use mobile-first approach with `breakpoint()` mixins; avoid `max-width` queries

### Accessibility Considerations

- **Relative Units**: `unit.gl` uses `rem` internally, respecting user font-size preferences
- **Viewport Scaling**: `fluid_type()` ensures readable text across all devices
- **Visual Guides**: Enable baseline grid during development to verify vertical rhythm alignment

### Common Pitfalls to Avoid

**Don't mix unit systems**
```scss
.bad {
  padding: 10px;      // Hardcoded px
  margin: q(8);       // Kyū unit
}
```

**Use consistent units**
```scss
.good {
  padding: q(10);     // All Kyū
  margin: q(8);
}
```

**Don't nest too many breakpoints**
```scss
.bad {
  @include breakpoint(md) {
    @include breakpoint(lg) {  // Nested breakpoint = bad specificity
      // ...
    }
  }
}
```

**Keep breakpoints flat**
```scss
.good {
  @include breakpoint(md) { /* md styles */ }
  @include breakpoint(lg) { /* lg styles */ }
}
```

---

## Visual Reference

### Kyū Unit System Diagram

```
┌─────────────────────────────────────────────────────────┐
│  1rem = 16q = 16px (default browser font size)          │
├─────────────────────────────────────────────────────────┤
│  1q   = 0.0625rem = 1px    │  Base unit               │
│  4q   = 0.25rem   = 4px    │  Small spacing           │
│  8q   = 0.5rem    = 8px    │  Medium spacing          │
│  16q  = 1rem      = 16px   │  Large spacing           │
│  32q  = 2rem      = 32px   │  Extra-large spacing     │
└─────────────────────────────────────────────────────────┘
```

### Modular Scale Visualization (Golden Ratio 1.618)

```
h1 ████████████████ (6.854rem) ← modular_scale(4)
h2 ██████████       (4.236rem) ← modular_scale(3)
h3 ██████           (2.618rem) ← modular_scale(2)
h4 ████            (1.618rem) ← modular_scale(1)
p  ██              (1.000rem) ← modular_scale(0)
```

### Breakpoint Reference

| Name | Min Width | Q Format        | Device Target          |
|------|-----------|-----------------|------------------------|
| us   | 250px     | Q07 Portrait    | Compact / Fold         |
| ss   | 360px     | Q06 Portrait    | Phones                 |
| xs   | 540px     | Q05 Portrait    | Large phones           |
| sm   | 720px     | Q04 Portrait    | Tablets                |
| md   | 1080px    | Q04 Landscape   | Laptops                |
| lg   | 1440px    | Q03 Landscape   | Desktops               |
| xl   | 2160px    | Q02 Landscape   | QHD Desktops           |
| sl   | 2880px    | Q01 Landscape   | 4K Displays            |
| ul   | 4320px    | Q00 Landscape   | 5K+ Displays           |

---

## Colophon

### Authors

**unit.gl** is an open-source project by **[Scape Press](https://www.scape.press "Scape Press website")**.

#### Scape Press

Scape Press is a spatial innovation collective that dreams, discovers and designs the everyday of tomorrow. We blend design thinking with emerging technologies to create a brighter perspective for people and planet. Our products and services naturalise technology in liveable and sustainable –scapes that spark the imagination and inspire future generations.

- website: [scape.press](https://www.scape.press "Scape Press website")
- github: [github.com/stylescape](https://github.com/stylescape "Scape Press GitHub")

#### Links

- [Website](https://www.unit.gl)
- [NPM](https://www.npmjs.com/unit.gl)

### Development Resources

#### Contributing

We'd love for you to contribute and to make this project even better than it is today!
Please refer to the [contribution guidelines](.github/CONTRIBUTING.md) for information.

### Legal Information

#### Copyright

Copyright &copy; 2025 [Scape Press BV](https://www.scape.press/ "Scape Press website"). All Rights Reserved.

#### License

Except as otherwise noted, the content in this repository is licensed under the
[Creative Commons Attribution 4.0 International (CC BY 4.0) License](https://creativecommons.org/licenses/by/4.0/), and
code is licensed under the [MIT License](LICENSE).

#### Disclaimer

**THIS SOFTWARE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
