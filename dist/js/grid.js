"use strict";
const STORAGE_KEY = 'unitgl:grid:visibility';
function loadVisibility() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    }
    catch (_a) {
        return {};
    }
}
function saveVisibility(visibilityMap) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibilityMap));
}
function updateAllGridHeights() {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    document.querySelectorAll('.grid_layer').forEach(layer => {
        if (layer.offsetHeight !== height) {
            layer.style.height = `${height}px`;
        }
    });
}
function updateStatusIndicator(id, isHidden) {
    const badge = document.querySelector(`[data-status="${id}"]`);
    if (badge) {
        badge.textContent = isHidden ? '✕ Off' : '✓ On';
    }
}
function applyVisibilityState(state) {
    document.querySelectorAll('.grid_layer').forEach(layer => {
        const id = layer.dataset.grid;
        const hidden = !!state[id];
        layer.classList.toggle('is-hidden', hidden);
        updateStatusIndicator(id, hidden);
    });
}
function setupGridToggles() {
    const visibility = loadVisibility();
    const buttons = document.querySelectorAll('button[data-toggle]');
    buttons.forEach(button => {
        const id = button.dataset.toggle;
        const layer = document.querySelector(`[data-grid="${id}"]`);
        if (!layer)
            return;
        button.addEventListener('click', () => {
            const isNowHidden = layer.classList.toggle('is-hidden');
            visibility[id] = isNowHidden;
            saveVisibility(visibility);
            updateStatusIndicator(id, isNowHidden);
        });
    });
    applyVisibilityState(visibility);
}
document.addEventListener('DOMContentLoaded', () => {
    updateAllGridHeights();
    setupGridToggles();
    window.addEventListener('resize', updateAllGridHeights);
    window.addEventListener('scroll', updateAllGridHeights);
});
//# sourceMappingURL=grid.js.map