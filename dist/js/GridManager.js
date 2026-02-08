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
        const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.offsetHeight, document.body.offsetHeight);
        document.querySelectorAll('.guide--layer').forEach(layer => {
            if (layer.offsetHeight !== height) {
                layer.style.height = `${height}px`;
            }
        });
    }
    applyVisibilityState() {
        document.querySelectorAll('.guide--layer').forEach(layer => {
            const id = layer.dataset.grid;
            const isActive = !!this.visibilityMap[id];
            layer.classList.toggle('active', isActive);
        });
        document.querySelectorAll('button[data-toggle]').forEach(button => {
            const id = button.dataset.toggle;
            const isActive = !!this.visibilityMap[id];
            button.classList.toggle('active', isActive);
        });
    }
    setupToggleButtons() {
        document.querySelectorAll('button[data-toggle]').forEach(button => {
            const id = button.dataset.toggle;
            const layer = document.querySelector(`[data-grid="${id}"]`);
            if (!layer)
                return;
            button.addEventListener('click', () => {
                const isNowActive = layer.classList.toggle('active');
                button.classList.toggle('active', isNowActive);
                this.visibilityMap[id] = isNowActive;
                this.saveVisibility();
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