/**
 * unit.gl - Main Entry Point
 * ==========================
 *
 * Core JavaScript runtime for unit.gl, providing:
 * - Grid overlay management via GridManager
 * - Device pixel ratio (DPR) injection as CSS custom properties
 * - Test site initialization and debugging utilities
 *
 * @module unit.gl
 * @author Scape Agency
 * @license MIT
 * @since 0.3.0
 * @see https://unit.gl
 */

// ============================================================================
// Imports
// ============================================================================

import { GridManager } from './GridManager.js';

// ============================================================================
// Initialization
// ============================================================================

/** Initialize grid overlay management */
new GridManager();

// ============================================================================
// DPR Injection
// ============================================================================

/**
 * Injects device pixel ratio (DPR) as CSS custom properties.
 *
 * @description
 * Creates `--dpr` and `--dpr-inverse` custom properties on the root element,
 * enabling density-aware calculations in CSS. The values automatically update
 * when the DPR changes (e.g., when moving a window between displays).
 *
 * @example
 * ```css
 * .element {
 *   // Scale based on pixel density
 *   transform: scale(var(--dpr-inverse));
 *
 *   // Density-aware borders
 *   border-width: calc(1px * var(--dpr));
 * }
 * ```
 *
 * @private
 */
function injectDPR(): void {
    /**
     * Updates the DPR custom properties on the document root.
     * @internal
     */
    const updateDPR = () => {
        const dpr = window.devicePixelRatio || 1;
        document.documentElement.style.setProperty('--dpr', dpr.toString());
        document.documentElement.style.setProperty('--dpr-inverse', (1 / dpr).toString());
    };

    // Set initial value
    updateDPR();

    // Update when DPR changes (e.g., moving window between displays)
    if (window.matchMedia) {
        /**
         * Sets up a media query listener to detect DPR changes.
         * Re-creates the listener each time DPR changes.
         * @internal
         */
        const updateOnChange = () => {
            const dpr = window.devicePixelRatio || 1;
            const mediaQuery = window.matchMedia(`(resolution: ${dpr}dppx)`);

            // When this media query no longer matches, DPR has changed
            const handler = (e: MediaQueryListEvent) => {
                if (!e.matches) {
                    updateDPR();
                    // Re-setup the listener with new DPR
                    mediaQuery.removeEventListener('change', handler);
                    updateOnChange();
                }
            };

            mediaQuery.addEventListener('change', handler);
        };

        updateOnChange();
    }
}

// Initialize DPR injection
injectDPR();

// ============================================================================
// DOM Ready Initialization
// ============================================================================

/**
 * DOM ready handler for test site initialization.
 * Logs diagnostic information and highlights active navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[unit.gl] Test site initialized');
  console.log(`[unit.gl] Device Pixel Ratio: ${window.devicePixelRatio}`);

  // Highlight current test page in navigation
  const current = location.pathname.split('/').pop();
  const activeLink = document.querySelector(`a[href$="${current}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Additional test tools or instrumentation could be bootstrapped here
});
