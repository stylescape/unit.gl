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

- **Viewport Breakpoints** – Predefined breakpoint system (xs, sm, md, lg, xl, sl) with `view()` mixin for mobile-first media queries
- **Device Profiles** – Pre-configured device-specific media queries for iPhone, iPad, Samsung Galaxy, and more
- **Aspect Ratio Utilities** – Maintain proportions with `display_ratio()` mixin supporting common ratios (16:9, 4:3, golden ratio)
- **Orientation Helpers** – Landscape/portrait-specific styling with `display_orientation_*` mixins

### Advanced SCSS Functions

- **Unit Conversion** – Seamless conversion between px, rem, em with `px_to_rem()`, `rem_to_px()`, `em_to_px()` functions
- **Math Operations** – `add()`, `subtract()` with intelligent unit handling; `modular_scale()` for ratio-based scaling
- **Layer Management** – z-index token system via `$layers` map and `z()` function for consistent stacking order
- **Paper Sizes** – ISO (A-series, B-series), ANSI, and custom Q-series paper dimensions for print layouts

### Developer Experience

- **Modern Sass** – Uses `sass:math`, `sass:map`, `sass:color` modules; no deprecated syntax
- **TypeScript Support** – Grid utilities and layout helpers with full type definitions
- **Visual Guides** – Built-in overlay system for baseline grids, margins, and alignment verification during development
- **Customizable Variables** – Override defaults for base units, breakpoints, scales, and colors via Sass variables

## Installation

### HTML Script Tag

``` html
<script src="https://unpkg.com/unit.gl@latest/dist.min.js"></script>
```

### NPM Module

``` bash
npm i unit.gl
```

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
  @include fluid_type(
    $min-size: 16px,
    $max-size: 48px,
    $min-vw: 320px,
    $max-vw: 1280px
  );
}

// Responsive breakpoints
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: q(4);

  @include view(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include view(lg) {
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
  @include view(sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: q(12);                       // 0.75rem
  }

  // Desktop: 3 columns
  @include view(md) {
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
@use "unit.gl" as *;

// Use golden ratio (1.618) for harmonious type scale
$scale-ratio: map.get($ratio_map, golden);

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
  @include device-media-query('iphone_x') {
    padding-top: env(safe-area-inset-top);  // Notch support
  }

  // Tablet landscape
  @include display_orientation_landscape {
    @include view(sm) {
      height: q(64);  // Shorter header in landscape
    }
  }
}
```

### TypeScript Integration

```typescript
import { GridManager } from 'unit.gl';

// Initialize grid overlay for development
const grid = new GridManager({
  columns: 12,
  gutter: 16,       // 16px gutter
  baseline: 8,      // 8px baseline grid
  color: 'rgba(255, 0, 0, 0.1)'
});

// Toggle grid visibility
grid.toggle();

// Update grid configuration
grid.updateConfig({ columns: 16 });
```

---

## Usage Guidelines & Best Practices

### Performance Optimization

1. **Minimize Media Query Complexity**
   - Use the `view()` mixin for standard breakpoints instead of custom media queries
   - Consolidate similar breakpoint rules to reduce CSS output

2. **Leverage Sass Variables**
   - Override defaults at the top of your main stylesheet:
     ```scss
     @use "unit.gl" with (
       $q: 0.0625rem,           // Customize base unit if needed
       $base_screen_unit: 16px  // Adjust breakpoint base
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
- **Z-Index Management**: Define your layer stack in `$layers` map at project start
- **Breakpoint Strategy**: Use mobile-first approach with `view()` mixins; avoid `max-width` queries

### Accessibility Considerations

- **Relative Units**: `unit.gl` uses `rem` internally, respecting user font-size preferences
- **Viewport Scaling**: `fluid_type()` ensures readable text across all devices
- **Visual Guides**: Enable baseline grid during development to verify vertical rhythm alignment

### Common Pitfalls to Avoid

❌ **Don't mix unit systems**
```scss
.bad {
  padding: 10px;      // Hardcoded px
  margin: q(8);       // Kyū unit
}
```

✅ **Use consistent units**
```scss
.good {
  padding: q(10);     // All Kyū
  margin: q(8);
}
```

❌ **Don't nest too many breakpoints**
```scss
.bad {
  @include view(md) {
    @include view(lg) {  // Nested breakpoint = bad specificity
      // ...
    }
  }
}
```

✅ **Keep breakpoints flat**
```scss
.good {
  @include view(md) { /* md styles */ }
  @include view(lg) { /* lg styles */ }
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

| Name | Min Width | Device Target          |
|------|-----------|------------------------|
| xs   | 320px     | Mobile (portrait)      |
| sm   | 480px     | Mobile (landscape)     |
| md   | 768px     | Tablet                 |
| lg   | 1024px    | Desktop                |
| xl   | 1280px    | Large Desktop          |
| sl   | 1920px    | Extra Large Display    |

---

## Colophon

### Authors

**unit.gl** is an open-source project by **[Scape Agency](https://www.scape.agency "Scape Agency website")**.

#### Scape Agency

Scape Agency is a spatial innovation collective that dreams, discovers and designs the everyday of tomorrow. We blend design thinking with emerging technologies to create a brighter perspective for people and planet. Our products and services naturalise technology in liveable and sustainable –scapes that spark the imagination and inspire future generations.

- website: [scape.agency](https://www.scape.agency "Scape Agency website")
- github: [github.com/stylescape](https://github.com/stylescape "Scape Agency GitHub")

#### Links

- [Website](https://www.unit.gl)
- [NPM](https://www.npmjs.com/unit.gl)

### Development Resources

#### Contributing

We'd love for you to contribute and to make this project even better than it is today!
Please refer to the [contribution guidelines](.github/CONTRIBUTING.md) for information.

### Legal Information

#### Copyright

Copyright &copy; 2025 [Scape Agency BV](https://www.scape.agency/ "Scape Agency website"). All Rights Reserved.

#### License

Except as otherwise noted, the content in this repository is licensed under the
[Creative Commons Attribution 4.0 International (CC BY 4.0) License](https://creativecommons.org/licenses/by/4.0/), and
code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).

Also see [LICENSE](https://github.com/stylescape/community/blob/master/src/LICENSE) and [LICENSE-CODE](https://github.com/stylescape/community/blob/master/src/LICENSE-CODE).

#### Disclaimer

**THIS SOFTWARE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
