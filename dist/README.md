<div align="right">

[![GitHub License](https://img.shields.io/github/license/scape-agency/unit.gl?style=flat-square&logo=readthedocs&logoColor=FFFFFF&label=&labelColor=%23041B26&color=%23041B26&link=LICENSE)](https://github.com/scape-agency/unit.gl/blob/main/LICENSE)
[![devContainer](https://img.shields.io/badge/Container-Remote?style=flat-square&logo=visualstudiocode&logoColor=%23FFFFFF&label=Remote&labelColor=%23041B26&color=%23041B26)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/scape-agency/unit.gl)

</div>

---

<div>
    <img align="right" src="https://raw.githubusercontent.com/scape-agency/brand/master/src/logo/unit.gl.png" width="96" alt="unit.gl logo">
    <h1 align="left">unit.gl</h1>
    <h3 align="left">Stylescape Layout Engine</h3>
</div>

---

<img align="right" width="50%" src="https://raw.githubusercontent.com/scape-agency/unit.gl/main/res/unit.gl.png" alt="unit.gl cover">

### Contents

- [Introduction](#introduction)
- [Colophon](#colophon)

<br clear="both"/>

---

<div align="right">

[![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/scape-agency/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=bug_report.yml)
[![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/scape-agency/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=feature_request.yml)
[![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/scape-agency/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=question.yml)
[![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/scape-agency/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=suggestion.yml)
[![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23E1E4E5)](https://github.com/scape-agency/unit.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=discussion.yml)

</div>

**Stylescape Layout Engine.**

## Introduction

`unit.gl` is a comprehensive design toolkit focused on fluid typography, responsive design, and advanced SCSS functions. It's crafted to empower designers and developers to create harmonious, scalable, and accessible web experiences efficiently.

## Features

- **Fluid Typography**: Utilizes the Kyū measurement system, allowing seamless scaling of text across different devices.
- **Modular Scale**: Provides functions for generating sizes (font-size, spacing) based on various musical and mathematical ratios.
- **Responsive Helpers**: Includes mixins for orientation and device-specific media queries, enabling designs that adapt to various screen sizes and resolutions.
- **Advanced SCSS Functions**: Contains a suite of functions for unit conversions, arithmetic operations, and generating sequences like Fibonacci, Lucas, and more.
- **Accessibility Considerations**: Ensures typography adheres to accessibility standards like WCAG.
- **Dynamic Scaling**: Implements CSS clamp for more dynamic scaling across a range of screen sizes.
- **Lucas and Fibonacci Series**: Functions to generate numbers from these famous sequences for use in design calculations.
- **Guides and Grids**: Mixins for creating baseline grids and guide overlays for design alignment.

## Installation

### HTML Script Tag

``` html
<script src="https://unpkg.com/unit.gl@latest/dist.min.js"></script>
```

### NPM Module

``` bash
npm i unit.gl
```

## Links

- [Website](https://www.unit.gl)
- [NPM](https://www.npmjs.com/package/unit.gl)


## Unit System

### Digital Size Conversions


### Physical SizeConversions


### Pixel Density

| Density Bucket    | Screen Density    | Physical Size     | Pixel Size        |                   |
| :---------------- | ----------------: | ----------------: | ----------------: | ----------------: |
| `ldpi`            | 120 *dpi*         | 0.5 x 0.5 *in*    | 60 x 60 *px*      | 0.5 in x 120 dpi  |
| `mdpi`            | 160 *dpi*         | 0.5 x 0.5 *in*    | 80 x 80 *px*      | 0.5 in x 160 dpi  |
| `hdpi`            | 240 *dpi*         | 0.5 x 0.5 *in*    | 120 x 120 *px*    | 0.5 in x 240 dpi  |
| `xhdpi`           | 320 *dpi*         | 0.5 x 0.5 *in*    | 160 x 160 *px*    | 0.5 in x 320 dpi  |
| `xxhdpi`          | 480 *dpi*         | 0.5 x 0.5 *in*    | 240 x 240 *px*    | 0.5 in x 480 dpi  |
| `xxxhdpi`         | 640 *dpi*         | 0.5 x 0.5 *in*    | 320 x 320 *px*    | 0.5 in x 640 dpi  |

More information:

- [Understanding Density Independence In Android](https://blog.mindorks.com/understanding-density-independent-pixel-sp-dp-dip-in-android/)
- [Material Design | Pixel density](https://m2.material.io/design/layout/pixel-density.html)

---

## Colophon

### Authors

**unit.gl** is an open-source project by **[Scape Agency](https://www.scape.agency "Scape Agency website")**.

##### Scape Agency

Scape Agency is a spatial innovation collective that dreams, discovers and designs the everyday of tomorrow. We blend design thinking with emerging technologies to create a brighter perspective for people and planet. Our products and services naturalise technology in liveable and sustainable –scapes that spark the imagination and inspire future generations.

- website: [scape.agency](https://www.scape.agency "Scape Agency website")
- github: [github.com/scape-agency](https://github.com/scape-agency "Scape Agency GitHub")

### Development Resources

#### Contributing

We'd love for you to contribute and to make this project even better than it is today!
Please refer to the [contribution guidelines](.github/CONTRIBUTING.md) for information.

### Legal Information

#### Copyright

Copyright &copy; 2023 [Scape Agency BV](https://www.scape.agency/ "Scape Agency website"). All Rights Reserved.

#### License

Except as otherwise noted, the content in this repository is licensed under the
[Creative Commons Attribution 4.0 International (CC BY 4.0) License](https://creativecommons.org/licenses/by/4.0/), and
code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).

Also see [LICENSE](https://github.com/scape-agency/community/blob/master/src/LICENSE) and [LICENSE-CODE](https://github.com/scape-agency/community/blob/master/src/LICENSE-CODE).

#### Disclaimer

**THIS SOFTWARE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
