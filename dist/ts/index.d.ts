/**
 * unit.gl Type Definitions
 * ========================
 *
 * TypeScript type definitions for the unit.gl JavaScript runtime.
 *
 * @packageDocumentation
 * @module unit.gl
 * @since 0.3.0
 */

export interface GridManagerOptions {
  /** Selector for grid toggle buttons */
  toggleSelector?: string;
  /** Selector for grid overlay elements */
  gridSelector?: string;
  /** Class applied when grid is active */
  activeClass?: string;
}

export declare class GridManager {
  constructor(options?: GridManagerOptions);

  /**
   * Toggle a specific grid overlay by name
   * @param gridType - The type of grid to toggle (e.g., 'baseline', 'graph')
   */
  toggle(gridType: string): void;

  /**
   * Show a specific grid overlay
   * @param gridType - The type of grid to show
   */
  show(gridType: string): void;

  /**
   * Hide a specific grid overlay
   * @param gridType - The type of grid to hide
   */
  hide(gridType: string): void;

  /**
   * Hide all grid overlays
   */
  hideAll(): void;
}

/**
 * Q-unit value type (number representing q-units)
 */
export type QValue = number;

/**
 * Breakpoint names used in the responsive system
 */
export type Breakpoint = 'us' | 'ss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ul';

/**
 * Format/paper size names
 */
export type FormatName =
  | 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6'
  | 'letter' | 'legal' | 'tabloid'
  | 'q00' | 'q0' | 'q01' | 'q1' | 'q02' | 'q2' | 'q03' | 'q3'
  | 'q04' | 'q4' | 'q05' | 'q5' | 'q06' | 'q6' | 'q07' | 'q7'
  | 'q08' | 'q8' | 'q09' | 'q9' | 'q10' | 'q11' | 'q12'
  | 'q00+' | 'q00++';

/**
 * Orientation for format() mixin
 */
export type Orientation = 'portrait' | 'landscape';
