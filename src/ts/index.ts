/**
 * unit.gl - Main Entry Point
 * ==========================
 *
 * Core JavaScript runtime for unit.gl, providing:
 * - Grid overlay management via GridManager
 * - Device pixel ratio (DPR) injection as CSS custom properties
 *
 * Importing this module in a browser initializes both; importing it during
 * server-side rendering is a no-op.
 *
 * @module unit.gl
 * @author Scape Press
 * @license MIT
 * @since 0.3.0
 * @see https://unit.gl
 */

import { GridManager } from './GridManager.js';
import { injectDPR } from './dpr.js';

export { GridManager, injectDPR };
export type { GridManagerOptions } from './GridManager.js';
export type { QValue, Breakpoint, FormatName, Orientation } from './types.js';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    new GridManager();
    injectDPR();
}
