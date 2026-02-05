// import './grids.js';

import { GridManager } from './GridManager.js';

new GridManager(); // auto-initializes

/**
 * Injects device pixel ratio (DPR) as a CSS custom property.
 * This enables density-aware calculations in CSS using var(--dpr).
 *
 * The property is updated when the DPR changes (e.g., when moving
 * a window between displays with different densities).
 */
function injectDPR(): void {
    const updateDPR = () => {
        const dpr = window.devicePixelRatio || 1;
        document.documentElement.style.setProperty('--dpr', dpr.toString());
        document.documentElement.style.setProperty('--dpr-inverse', (1 / dpr).toString());
    };

    // Set initial value
    updateDPR();

    // Update when DPR changes (e.g., moving window between displays)
    if (window.matchMedia) {
        // Create a media query that matches the current DPR
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('[unit.gl] Test site initialized');
  console.log(`[unit.gl] Device Pixel Ratio: ${window.devicePixelRatio}`);

  // Example: highlight current test page in nav
  const current = location.pathname.split('/').pop();
  const activeLink = document.querySelector(`a[href$="${current}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Additional test tools or instrumentation could be bootstrapped here
});
