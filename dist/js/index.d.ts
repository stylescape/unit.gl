/**
 * unit.gl Type Definitions
 * ========================
 *
 * TypeScript type definitions for the unit.gl JavaScript runtime.
 * These definitions provide type safety when using unit.gl in TypeScript projects.
 *
 * @packageDocumentation
 * @module unit.gl
 * @author Scape Agency
 * @license MIT
 * @since 0.3.0
 * @see https://unit.gl
 */

// ============================================================================
// Grid Management Types
// ============================================================================

/**
 * Configuration options for the GridManager class.
 *
 * @interface GridManagerOptions
 * @example
 * ```typescript
 * const options: GridManagerOptions = {
 *   toggleSelector: '.grid-toggle',
 *   gridSelector: '.grid-overlay',
 *   activeClass: 'visible'
 * };
 * ```
 */
interface GridManagerOptions {
  /**
   * CSS selector for grid toggle buttons.
   * @default '[data-toggle]'
   */
  toggleSelector?: string;

  /**
   * CSS selector for grid overlay elements.
   * @default '[data-grid]'
   */
  gridSelector?: string;

  /**
   * CSS class applied when a grid overlay is active/visible.
   * @default 'active'
   */
  activeClass?: string;
}

/**
 * Manages design grid overlays for development and testing.
 *
 * @description
 * GridManager provides methods to toggle, show, and hide design grid overlays.
 * It persists visibility state in localStorage for consistent behavior across
 * page reloads.
 *
 * @class GridManager
 * @example
 * ```typescript
 * // Basic usage - auto-initializes with defaults
 * const gridManager = new GridManager();
 *
 * // Toggle a specific grid
 * gridManager.toggle('baseline');
 *
 * // Show multiple grids
 * gridManager.show('baseline');
 * gridManager.show('graph');
 *
 * // Hide all grids
 * gridManager.hideAll();
 * ```
 */
declare class GridManager {
  /**
   * Creates a new GridManager instance.
   * @param options - Configuration options for the grid manager
   */
  constructor(options?: GridManagerOptions);

  /**
   * Toggles visibility of a specific grid overlay.
   *
   * @param gridType - The type/name of grid to toggle (e.g., 'baseline', 'graph')
   * @example gridManager.toggle('baseline')
   */
  toggle(gridType: string): void;

  /**
   * Shows a specific grid overlay.
   *
   * @param gridType - The type/name of grid to show
   * @example gridManager.show('graph')
   */
  show(gridType: string): void;

  /**
   * Hides a specific grid overlay.
   *
   * @param gridType - The type/name of grid to hide
   * @example gridManager.hide('baseline')
   */
  hide(gridType: string): void;

  /**
   * Hides all grid overlays.
   *
   * @example gridManager.hideAll()
   */
  hideAll(): void;
}

// ============================================================================
// Unit System Types
// ============================================================================

/**
 * Numeric value representing Q-units.
 *
 * @description
 * Q-units are the fundamental measurement unit in unit.gl.
 * 1Q = 0.25mm = 1px at 4× pixel density (96dpi × 4 = 384dpi).
 *
 * @typedef {number} QValue
 * @example
 * ```typescript
 * const spacing: QValue = 20; // 20Q = 5mm = 20px
 * const fontSize: QValue = 16; // 16Q = 4mm = 16px
 * ```
 */
type QValue = number;

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
 * - `ul`: Ultra-large (very large displays)
 *
 * @typedef {string} Breakpoint
 */
type Breakpoint = 'us' | 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ul';

/**
 * Named format/paper sizes supported by the format() mixin.
 *
 * @description
 * Includes standard paper sizes (A-series, US) and Q-format sizes.
 * Q-format sizes follow the √2 ratio system aligned with Q-unit measurements.
 *
 * @typedef {string} FormatName
 *
 * @example
 * ```typescript
 * const format: FormatName = 'q04'; // Q04 format (180×270mm)
 * const paper: FormatName = 'a4';   // Standard A4 paper
 * ```
 */
type FormatName =
  | 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6'
  | 'letter' | 'legal' | 'tabloid'
  | 'q00' | 'q0' | 'q01' | 'q1' | 'q02' | 'q2' | 'q03' | 'q3'
  | 'q04' | 'q4' | 'q05' | 'q5' | 'q06' | 'q6' | 'q07' | 'q7'
  | 'q08' | 'q8' | 'q09' | 'q9' | 'q10' | 'q11' | 'q12'
  | 'q00+' | 'q00++';

/**
 * Page orientation for the format() mixin.
 *
 * @typedef {string} Orientation
 * @example
 * ```typescript
 * const orientation: Orientation = 'landscape';
 * ```
 */
type Orientation = 'portrait' | 'landscape';

export { type Breakpoint, type FormatName, GridManager, type GridManagerOptions, type Orientation, type QValue };
