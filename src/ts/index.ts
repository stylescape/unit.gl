import './grids.js';

// Additional imports could go here:
// import './typography';
// import './debug';
// import './viewport-tools';

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
