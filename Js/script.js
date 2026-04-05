'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initYearStamp();
  initSmoothScroll();
  initModal();
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
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Ignorar los links que abren modales para que no interrumpan
      if (link.classList.contains('legal-trigger')) return;

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

/**
 * Lógica para abrir y cerrar la ventana modal de términos y privacidad.
 */
function initModal() {
  const modal = document.getElementById('legal-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.legal-trigger');

  if (!modal) return;

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Cerrar al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
