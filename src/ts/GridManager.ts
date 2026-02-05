/**
 * GridManager Module
 * ==================
 *
 * Manages grid overlay visibility with persistent state via localStorage.
 * Provides toggle functionality for design grid overlays used during development.
 *
 * @module GridManager
 * @author Scape Agency
 * @license MIT
 * @since 0.3.0
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Extended HTMLElement type for grid layer elements.
 * Includes typed dataset property for the grid identifier.
 */
type GridLayer = HTMLElement & { dataset: { grid: string } };

/**
 * Extended HTMLButtonElement type for toggle button elements.
 * Includes typed dataset property for the toggle target identifier.
 */
type ToggleButton = HTMLButtonElement & { dataset: { toggle: string } };

// ============================================================================
// GridManager Class
// ============================================================================

/**
 * Manages grid overlay visibility with localStorage persistence.
 *
 * @description
 * This class handles the toggling and persistence of design grid overlays.
 * It stores visibility state in localStorage so grid preferences persist
 * across page reloads. The manager automatically applies saved state on
 * initialization and updates grid heights on resize/scroll events.
 *
 * @example
 * ```typescript
 * // Auto-initializes when instantiated
 * new GridManager();
 *
 * // Grids are controlled via data attributes in HTML:
 * // <button data-toggle="baseline">Toggle Baseline</button>
 * // <div class="guide--layer" data-grid="baseline">...</div>
 * ```
 */
export class GridManager {
  /** LocalStorage key for persisting grid visibility state */
  private readonly STORAGE_KEY = 'unitgl:grid:visibility';

  /** Map of grid identifiers to their visibility state */
  private visibilityMap: Record<string, boolean> = {};

  /**
   * Creates a new GridManager instance.
   * Automatically loads saved visibility state and sets up event listeners.
   */
  constructor() {
    this.loadVisibility();
    this.applyVisibilityState();
    this.setupEventListeners();
  }

  /**
   * Loads visibility state from localStorage.
   * Falls back to empty object if parsing fails or no data exists.
   * @private
   */
  private loadVisibility(): void {
    try {
      this.visibilityMap = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      this.visibilityMap = {};
    }
  }

  /**
   * Persists current visibility state to localStorage.
   * @private
   */
  private saveVisibility(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visibilityMap));
  }

  /**
   * Updates all grid layer heights to match document height.
   * Ensures grid overlays cover the full scrollable content area.
   * @private
   */
  private updateAllGridHeights(): void {
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );

    document.querySelectorAll<HTMLElement>('.guide--layer').forEach(layer => {
      if (layer.offsetHeight !== height) {
        layer.style.height = `${height}px`;
      }
    });
  }

  /**
   * Applies saved visibility state to all grid layers and toggle buttons.
   * Adds/removes 'active' class based on stored preferences.
   * @private
   */
  private applyVisibilityState(): void {
    document.querySelectorAll<GridLayer>('.guide--layer').forEach(layer => {
      const id = layer.dataset.grid;
      const isActive = !!this.visibilityMap[id];
      layer.classList.toggle('active', isActive);
    });

    document.querySelectorAll<ToggleButton>('button[data-toggle]').forEach(button => {
      const id = button.dataset.toggle;
      const isActive = !!this.visibilityMap[id];
      button.classList.toggle('active', isActive);
    });
  }

  /**
   * Sets up click handlers for all toggle buttons.
   * Each button toggles its associated grid layer and persists state.
   * @private
   */
  private setupToggleButtons(): void {
    document.querySelectorAll<ToggleButton>('button[data-toggle]').forEach(button => {
      const id = button.dataset.toggle;
      const layer = document.querySelector<GridLayer>(`[data-grid="${id}"]`);
      if (!layer) return;

      button.addEventListener('click', () => {
        const isNowActive = layer.classList.toggle('active');
        button.classList.toggle('active', isNowActive);
        this.visibilityMap[id] = isNowActive;
        this.saveVisibility();
      });
    });
  }

  /**
   * Sets up global event listeners for DOM ready, resize, and scroll.
   * Ensures grid heights are updated and toggle buttons are initialized.
   * @private
   */
  private setupEventListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateAllGridHeights();
      this.setupToggleButtons();

      window.addEventListener('resize', () => this.updateAllGridHeights());
      window.addEventListener('scroll', () => this.updateAllGridHeights());
    });
  }
}
