# unit.gl


Unit.gl is a resizing engine developed by Stylescape, primarily focused on responsive scaling of CSS properties to optimize the utilization of space across various viewports and devices. Here's a breakdown of its features and history:

1. **Responsive Font Sizes (RFS)**: Initially, unit.gl was designed to resize font sizes, which is reflected in its name, RFS. Over time, its capabilities expanded to rescale most CSS properties with unit values, such as margin, padding, border-radius, and box-shadow.

2. **Responsive Scaling Mechanism**: The engine automatically calculates appropriate values based on the browser viewport's dimensions. These calculations are compiled into `calc()` functions, which combine `rem` and viewport units to enable responsive behavior.

3. **Mixins Usage**: Unit.gl includes the `q()` mixin, providing shorthands for various CSS properties, including font-size, margin, padding, and their directional variations (top, right, bottom, left). This feature simplifies the implementation of responsive design in CSS.

4. **Kyū Measurement Basis**: Unit.gl is based on the Kyū measurement, a unit used in Japan to express character size in photocomposition, equivalent to 0.25mm. The Kyū unit's history is intertwined with early photocomposition techniques and the evolution of typography in Japan.

5. **Historical Context**: The concept of Kyū aligns with other typographic measurements like points, used since the era of movable type. The standard size of points varies by region, reflecting the diverse historical and logical underpinnings of these measurements. For instance, an American point is 0.3514mm, while a Didot point, common in Europe, is 0.3579mm.

6. **Legacy of the Gō Unit**: In Japanese typography, another historical unit, the gō, was used to express character size, particularly during the early movable type printing era. Though no longer in use, the legacy of the gō unit is reflected in standard character sizes in modern PC software, such as a 5-gō character equating to a standard 10.5-point character in Microsoft Word.

For more detailed information, you can refer to Bootstrap's documentation on RFS at [getbootstrap.com](https://getbootstrap.com/docs/5.0/getting-started/rfs/) or the GitHub repository for RFS at [github.com/twbs/rfs](https://github.com/twbs/rfs/tree/v9.0.3).













Stylescape’s resizing engine responsively scales common CSS properties to better utilize available space across viewports and devices.

- Fluid typography
- Paper layout

What is unit.gl?
Stylescape’s side project unit.gl is a unit resizing engine which was initially developed to resize font sizes (hence its abbreviation for Responsive Font Sizes). Nowadays RFS is capable of rescaling most CSS properties with unit values like margin, padding, border-radius, or even box-shadow.

The mechanism automatically calculates the appropriate values based on the dimensions of the browser viewport. It will be compiled into calc() functions with a mix of rem and viewport units to enable the responsive scaling behavior.

Using the mixins
The q() mixin has shorthands for font-size, margin, margin-top, margin-right, margin-bottom, margin-left, padding, padding-top, padding-right, padding-bottom, and padding-left. See the example below for source Sass and compiled CSS.




## Kyū

unit.gl is based on the Kyū measurement.

Kyū (級) is a unit of measurement used to express the size of characters in photocomposition that is particular to Japan; it is equal to 0.25mm. It can also be written as “Q,” an abbreviation that is derived from the origin of its name, “quarter,” as in a quarter of a millimeter. Today characters have been digitized and almost no composition is done optically any more. While kyū is used for character size, Ha (歯, which can be abbreviated as “H”) is used for measurements of the space between characters and the space between lines. 1 ha is equal to 0.25mm, so it functions in the same way as character sizing. Early photocomposition machines generated type on printing paper that was rolled onto drums that were turned using cogwheels (歯車 haguruma in Japanese). Each cog (歯 ha) was 1 kyū in length (0.25mm), which gave the measurement its name.

Similarly, “points” are another unit for expressing the size of characters. This unit has been used since the era of movable type, though the standard size varies depending on the region and system in which it has been adopted. For example, 1 American point (pt) is 0.3514mm, while 1 Didot point, which is used primarily in Europe, is 0.3579mm. In Japan, the American point has been adopted by the JIS (Japanese Industrial Standard). In DTP, normally 1 point is treated as being 0.3528mm. These variations arose from differences in the underlying logics and historical circumstances of their creation.

In Japan, since Motoki Shōzō began his work with movable type printing, another unit has been used to express the size of characters: the gō (号). This unit is not used today, but the size of a 5-gō character is equal to a standard 10.5-point character used in PC software such as Microsoft Word. This is because the standard character size used in documents was 5-gō.

## References

### RFS

- https://getbootstrap.com/docs/5.0/getting-started/rfs/
- https://github.com/twbs/rfs/tree/v9.0.3


// based on:
// https://css-tricks.com/snippets/css/fluid-typography/
// https://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/
// https://www.madebymike.com.au/writing/precise-control-responsive-typography/
// https://trentwalton.com/2012/06/19/fluid-type/
// https://tbrown.org/notes/2012/02/03/molten-leading-or-fluid-line-height/
// https://css-tricks.com/snippets/sass/strip-unit-function/



https://art-design-glossary.musabi.ac.jp/kyu-ha-point/