export class GridManager {
    constructor() {
        this.STORAGE_KEY = 'unitgl:grid:visibility';
        this.visibilityMap = {};
        this.loadVisibility();
        this.applyVisibilityState();
        this.setupEventListeners();
    }
    loadVisibility() {
        try {
            this.visibilityMap = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        }
        catch (_a) {
            this.visibilityMap = {};
        }
    }
    saveVisibility() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visibilityMap));
    }
    updateAllGridHeights() {
        const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        document.querySelectorAll('.grid_layer').forEach(layer => {
            if (layer.offsetHeight !== height) {
                layer.style.height = `${height}px`;
            }
        });
    }
    updateStatusIndicator(id, isHidden) {
        const badge = document.querySelector(`[data-status="${id}"]`);
        if (badge) {
            badge.textContent = isHidden ? '✕ Off' : '✓ On';
        }
    }
    applyVisibilityState() {
        document.querySelectorAll('.grid_layer').forEach(layer => {
            const id = layer.dataset.grid;
            const hidden = !!this.visibilityMap[id];
            layer.classList.toggle('is-hidden', hidden);
            this.updateStatusIndicator(id, hidden);
        });
    }
    setupToggleButtons() {
        document.querySelectorAll('button[data-toggle]').forEach(button => {
            const id = button.dataset.toggle;
            const layer = document.querySelector(`[data-grid="${id}"]`);
            if (!layer)
                return;
            button.addEventListener('click', () => {
                const isNowHidden = layer.classList.toggle('is-hidden');
                this.visibilityMap[id] = isNowHidden;
                this.saveVisibility();
                this.updateStatusIndicator(id, isNowHidden);
            });
        });
    }
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.updateAllGridHeights();
            this.setupToggleButtons();
            window.addEventListener('resize', () => this.updateAllGridHeights());
            window.addEventListener('scroll', () => this.updateAllGridHeights());
        });
    }
}
//# sourceMappingURL=GridManager.js.map