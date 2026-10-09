/**
 * GridManager Module
 * ==================
 *
 * Manages grid overlay visibility with persistent state via localStorage.
 * Provides toggle functionality for design grid overlays used during development.
 *
 * @module GridManager
 * @author Scape Press
 * @license MIT
 * @since 0.3.0
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Configuration options for the GridManager class.
 *
 * @example
 * ```typescript
 * const options: GridManagerOptions = {
 *   toggleSelector: '.grid-toggle',
 *   gridSelector: '.grid-overlay',
 *   activeClass: 'visible'
 * };
 * ```
 */
export interface GridManagerOptions {
  /**
   * CSS selector for grid toggle buttons. Each button names the grid it
   * controls in its `data-toggle` attribute.
   * @default 'button[data-toggle]'
   */
  toggleSelector?: string;

  /**
   * CSS selector for grid overlay elements. Each overlay names itself in its
   * `data-grid` attribute.
   * @default '.guide--layer'
   */
  gridSelector?: string;

  /**
   * CSS class applied when a grid overlay is active/visible.
   * @default 'active'
   */
  activeClass?: string;

  /**
   * localStorage key used to persist visibility state.
   * @default 'unitgl:grid:visibility'
   */
  storageKey?: string;
}

// ============================================================================
// Storage helpers
// ============================================================================

/**
 * Reads the persisted visibility map. Storage can be unavailable (private
 * browsing, sandboxed iframes, disabled cookies) or hold foreign data, so
 * anything unexpected yields an empty map.
 */
function readVisibility(key: string): Record<string, boolean> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, boolean>)
      : {};
  } catch {
    return {};
  }
}

/**
 * Persists the visibility map. A failed write only loses persistence; the
 * overlays themselves keep working.
 */
function writeVisibility(key: string, map: Record<string, boolean>): void {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    // Storage unavailable or full: visibility simply won't survive a reload.
  }
}

// ============================================================================
// GridManager Class
// ============================================================================

/**
 * Manages grid overlay visibility with localStorage persistence.
 *
 * @description
 * This class handles the toggling and persistence of design grid overlays.
 * It stores visibility state in localStorage so grid preferences persist
 * across page reloads. The manager applies saved state on initialization and
 * keeps overlay heights in sync with the document height.
 *
 * @example
 * ```typescript
 * const grids = new GridManager();
 * grids.toggle('baseline');
 * grids.hideAll();
 *
 * // Grids are controlled via data attributes in HTML:
 * // <button data-toggle="baseline">Toggle Baseline</button>
 * // <div class="guide--layer" data-grid="baseline">...</div>
 * ```
 */
export class GridManager {
  private readonly toggleSelector: string;
  private readonly gridSelector: string;
  private readonly activeClass: string;
  private readonly storageKey: string;

  /** Map of grid identifiers to their visibility state */
  private visibilityMap: Record<string, boolean>;

  /** Pending animation frame for a height update, if any */
  private heightFrame = 0;

  /**
   * Creates a new GridManager instance.
   * Loads saved visibility state and wires up toggle buttons once the DOM is
   * ready.
   */
  constructor(options: GridManagerOptions = {}) {
    this.toggleSelector = options.toggleSelector ?? 'button[data-toggle]';
    this.gridSelector = options.gridSelector ?? '.guide--layer';
    this.activeClass = options.activeClass ?? 'active';
    this.storageKey = options.storageKey ?? 'unitgl:grid:visibility';
    this.visibilityMap = readVisibility(this.storageKey);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init(), { once: true });
    } else {
      // Module scripts are deferred and may execute after DOMContentLoaded.
      this.init();
    }
  }

  // --------------------------------------------------------------------------
  // Public API
  // --------------------------------------------------------------------------

  /** Toggles visibility of a grid overlay. */
  toggle(gridType: string): void {
    this.setVisible(gridType, !this.isVisible(gridType));
  }

  /** Shows a grid overlay. */
  show(gridType: string): void {
    this.setVisible(gridType, true);
  }

  /** Hides a grid overlay. */
  hide(gridType: string): void {
    this.setVisible(gridType, false);
  }

  /** Hides every grid overlay. */
  hideAll(): void {
    this.visibilityMap = {};
    writeVisibility(this.storageKey, this.visibilityMap);
    this.render();
  }

  /** Whether a grid overlay is currently visible. */
  isVisible(gridType: string): boolean {
    return !!this.visibilityMap[gridType];
  }

  // --------------------------------------------------------------------------
  // Internals
  // --------------------------------------------------------------------------

  private init(): void {
    this.render();

    document.querySelectorAll<HTMLElement>(this.toggleSelector).forEach(button => {
      const id = button.dataset.toggle;
      if (!id || !this.layerFor(id)) return;
      button.addEventListener('click', () => this.toggle(id));
    });

    // Document height changes with content and viewport width; scrolling
    // never changes it, so there is no scroll listener.
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.scheduleHeightUpdate()).observe(document.body);
    } else {
      window.addEventListener('resize', () => this.scheduleHeightUpdate());
    }
  }

  private setVisible(gridType: string, visible: boolean): void {
    this.visibilityMap[gridType] = visible;
    writeVisibility(this.storageKey, this.visibilityMap);
    this.render();
  }

  /** Syncs overlay and button state with the visibility map. */
  private render(): void {
    this.layers().forEach(layer => {
      layer.classList.toggle(this.activeClass, this.isVisible(layer.dataset.grid ?? ''));
    });

    document.querySelectorAll<HTMLElement>(this.toggleSelector).forEach(button => {
      const id = button.dataset.toggle;
      if (!id || !this.layerFor(id)) return;
      const active = this.isVisible(id);
      button.classList.toggle(this.activeClass, active);
      button.setAttribute('aria-pressed', String(active));
    });

    this.scheduleHeightUpdate();
  }

  private layers(): NodeListOf<HTMLElement> {
    return document.querySelectorAll<HTMLElement>(this.gridSelector);
  }

  private layerFor(id: string): HTMLElement | null {
    return document.querySelector<HTMLElement>(`[data-grid="${CSS.escape(id)}"]`);
  }

  private scheduleHeightUpdate(): void {
    if (this.heightFrame) return;
    this.heightFrame = requestAnimationFrame(() => {
      this.heightFrame = 0;
      this.updateAllGridHeights();
    });
  }

  /**
   * Stretches overlays over the full scrollable document. The overlays are
   * absolutely positioned, so their own height counts towards the document
   * height: it is cleared before measuring, otherwise overlays could only
   * ever grow.
   */
  private updateAllGridHeights(): void {
    const layers = this.layers();
    layers.forEach(layer => (layer.style.height = ''));

    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    layers.forEach(layer => (layer.style.height = `${height}px`));
  }
}
