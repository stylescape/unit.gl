/**
 * DPR Module
 * ==========
 *
 * Exposes the device pixel ratio (DPR) to CSS as custom properties.
 *
 * @module dpr
 * @author Scape Press
 * @license MIT
 * @since 0.3.0
 */

/**
 * Injects device pixel ratio (DPR) as CSS custom properties.
 *
 * @description
 * Creates `--dpr` and `--dpr-inverse` custom properties on the root element,
 * enabling density-aware calculations in CSS. The values automatically update
 * when the DPR changes (e.g., when moving a window between displays or
 * zooming).
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
 */
export function injectDPR(): void {
    const root = document.documentElement;

    const updateDPR = () => {
        const dpr = window.devicePixelRatio || 1;
        root.style.setProperty('--dpr', String(dpr));
        root.style.setProperty('--dpr-inverse', String(1 / dpr));
    };

    updateDPR();

    if (!window.matchMedia) return;

    // A resolution query only matches the current DPR, so it fires `change`
    // exactly once when the DPR moves; re-arm it for the new value each time.
    const watch = () => {
        const dpr = window.devicePixelRatio || 1;
        window.matchMedia(`(resolution: ${dpr}dppx)`).addEventListener(
            'change',
            () => {
                updateDPR();
                watch();
            },
            { once: true }
        );
    };

    watch();
}
