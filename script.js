'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initYearStamp();
  initSmoothScroll();
});

/**
 * Actualiza el año en el footer automáticamente.
 */
function initYearStamp() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Habilita scroll suave para los enlaces de navegación internos
 * (por si el soporte nativo de CSS scroll-behavior falla o se prefiere JS).
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
