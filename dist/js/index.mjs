// src/ts/GridManager.ts
var GridManager = class {
  /**
   * Creates a new GridManager instance.
   * Automatically loads saved visibility state and sets up event listeners.
   */
  constructor() {
    /** LocalStorage key for persisting grid visibility state */
    this.STORAGE_KEY = "unitgl:grid:visibility";
    /** Map of grid identifiers to their visibility state */
    this.visibilityMap = {};
    this.loadVisibility();
    this.applyVisibilityState();
    this.setupEventListeners();
  }
  /**
   * Loads visibility state from localStorage.
   * Falls back to empty object if parsing fails or no data exists.
   * @private
   */
  loadVisibility() {
    try {
      this.visibilityMap = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
    } catch {
      this.visibilityMap = {};
    }
  }
  /**
   * Persists current visibility state to localStorage.
   * @private
   */
  saveVisibility() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visibilityMap));
  }
  /**
   * Updates all grid layer heights to match document height.
   * Ensures grid overlays cover the full scrollable content area.
   * @private
   */
  updateAllGridHeights() {
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );
    document.querySelectorAll(".guide--layer").forEach((layer) => {
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
  applyVisibilityState() {
    document.querySelectorAll(".guide--layer").forEach((layer) => {
      const id = layer.dataset.grid;
      const isActive = !!this.visibilityMap[id];
      layer.classList.toggle("active", isActive);
    });
    document.querySelectorAll("button[data-toggle]").forEach((button) => {
      const id = button.dataset.toggle;
      const isActive = !!this.visibilityMap[id];
      button.classList.toggle("active", isActive);
    });
  }
  /**
   * Sets up click handlers for all toggle buttons.
   * Each button toggles its associated grid layer and persists state.
   * @private
   */
  setupToggleButtons() {
    document.querySelectorAll("button[data-toggle]").forEach((button) => {
      const id = button.dataset.toggle;
      const layer = document.querySelector(`[data-grid="${id}"]`);
      if (!layer) return;
      button.addEventListener("click", () => {
        const isNowActive = layer.classList.toggle("active");
        button.classList.toggle("active", isNowActive);
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
  setupEventListeners() {
    const init = () => {
      this.updateAllGridHeights();
      this.setupToggleButtons();
      window.addEventListener("resize", () => this.updateAllGridHeights());
      window.addEventListener("scroll", () => this.updateAllGridHeights());
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
};

// src/ts/index.ts
new GridManager();
function injectDPR() {
  const updateDPR = () => {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.style.setProperty("--dpr", dpr.toString());
    document.documentElement.style.setProperty("--dpr-inverse", (1 / dpr).toString());
  };
  updateDPR();
  if (window.matchMedia) {
    const updateOnChange = () => {
      const dpr = window.devicePixelRatio || 1;
      const mediaQuery = window.matchMedia(`(resolution: ${dpr}dppx)`);
      const handler = (e) => {
        if (!e.matches) {
          updateDPR();
          mediaQuery.removeEventListener("change", handler);
          updateOnChange();
        }
      };
      mediaQuery.addEventListener("change", handler);
    };
    updateOnChange();
  }
}
injectDPR();
document.addEventListener("DOMContentLoaded", () => {
  console.log("[unit.gl] Test site initialized");
  console.log(`[unit.gl] Device Pixel Ratio: ${window.devicePixelRatio}`);
  const current = location.pathname.split("/").pop();
  const activeLink = document.querySelector(`a[href$="${current}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
});
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
 * @author Scape Press
 * @license MIT
 * @since 0.3.0
 * @see https://unit.gl
 */
//# sourceMappingURL=index.mjs.map