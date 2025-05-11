import './grids.js';
document.addEventListener('DOMContentLoaded', () => {
    console.log('[unit.gl] Test site initialized');
    const current = location.pathname.split('/').pop();
    const activeLink = document.querySelector(`a[href$="${current}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});
//# sourceMappingURL=index.js.map