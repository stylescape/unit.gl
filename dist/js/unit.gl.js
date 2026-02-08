import { GridManager } from './GridManager.js';
new GridManager();
function injectDPR() {
    const updateDPR = () => {
        const dpr = window.devicePixelRatio || 1;
        document.documentElement.style.setProperty('--dpr', dpr.toString());
        document.documentElement.style.setProperty('--dpr-inverse', (1 / dpr).toString());
    };
    updateDPR();
    if (window.matchMedia) {
        const updateOnChange = () => {
            const dpr = window.devicePixelRatio || 1;
            const mediaQuery = window.matchMedia(`(resolution: ${dpr}dppx)`);
            const handler = (e) => {
                if (!e.matches) {
                    updateDPR();
                    mediaQuery.removeEventListener('change', handler);
                    updateOnChange();
                }
            };
            mediaQuery.addEventListener('change', handler);
        };
        updateOnChange();
    }
}
injectDPR();
document.addEventListener('DOMContentLoaded', () => {
    console.log('[unit.gl] Test site initialized');
    console.log(`[unit.gl] Device Pixel Ratio: ${window.devicePixelRatio}`);
    const current = location.pathname.split('/').pop();
    const activeLink = document.querySelector(`a[href$="${current}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});
//# sourceMappingURL=index.js.map