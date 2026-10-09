/**
 * unit.gl Types
 * =============
 *
 * Shared type definitions for the unit.gl JavaScript runtime, mirroring the
 * names used by the Sass API.
 *
 * @module types
 * @author Scape Press
 * @license MIT
 * @since 0.3.0
 */

/**
 * Numeric value representing Q-units.
 *
 * @description
 * Q-units are the fundamental measurement unit in unit.gl.
 * 1Q = 0.25mm = 1px at 4× pixel density (96dpi × 4 = 384dpi).
 *
 * @example
 * ```typescript
 * const spacing: QValue = 20; // 20Q = 5mm = 20px
 * const fontSize: QValue = 16; // 16Q = 4mm = 16px
 * ```
 */
export type QValue = number;

/**
 * Named breakpoints in the responsive system.
 *
 * @description
 * Breakpoint names follow a size-based naming convention:
 * - `us`: Ultra-small (watches, tiny devices)
 * - `ss`: Super-small (small phones)
 * - `xs`: Extra-small (phones)
 * - `sm`: Small (large phones, small tablets)
 * - `md`: Medium (tablets)
 * - `lg`: Large (desktops)
 * - `xl`: Extra-large (large desktops)
 * - `sl`: Super-large (4K displays)
 * - `ul`: Ultra-large (very large displays)
 *
 */
export type Breakpoint = 'us' | 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sl' | 'ul';

/**
 * Named format/paper sizes supported by the format() mixin.
 *
 * @description
 * Includes standard paper sizes (A-series, US) and Q-format sizes.
 * Q-format sizes follow the √2 ratio system aligned with Q-unit measurements.
 *
 *
 * @example
 * ```typescript
 * const format: FormatName = 'q04'; // Q04 format (180×270mm)
 * const paper: FormatName = 'a4';   // Standard A4 paper
 * ```
 */
export type FormatName =
  | 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6'
  | 'letter' | 'legal' | 'tabloid'
  | 'q00' | 'q0' | 'q01' | 'q1' | 'q02' | 'q2' | 'q03' | 'q3'
  | 'q04' | 'q4' | 'q05' | 'q5' | 'q06' | 'q6' | 'q07' | 'q7'
  | 'q08' | 'q8' | 'q09' | 'q9' | 'q10' | 'q11' | 'q12'
  | 'q00+' | 'q00++';

/**
 * Page orientation for the format() mixin.
 *
 * @example
 * ```typescript
 * const orientation: Orientation = 'landscape';
 * ```
 */
export type Orientation = 'portrait' | 'landscape';

