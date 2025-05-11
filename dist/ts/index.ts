// import './grids.js';

import { GridManager } from './GridManager.js';

new GridManager(); // auto-initializes

document.addEventListener('DOMContentLoaded', () => {
  console.log('[unit.gl] Test site initialized');

  // Example: highlight current test page in nav
  const current = location.pathname.split('/').pop();
  const activeLink = document.querySelector(`a[href$="${current}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Additional test tools or instrumentation could be bootstrapped here
});
