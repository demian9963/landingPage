'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initYearStamp();
  initSmoothScroll();
  initModal();
  initCarousel();
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

/**
 * Inicializa el carrusel de videos en el mockup del monitor.
 */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!track) return;

  let currentSlide = 0;
  const slideCount = dots.length;
  let autoplayInterval;

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000); // Cambia cada 5 segundos
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startAutoplay(); // Reiniciar el temporizador al interactuar
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      goToSlide(slideIndex);
      startAutoplay();
    });
  });

  // Pausar el autoplay si el usuario pasa el mouse sobre el carrusel
  const carousel = document.getElementById('monitorCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // Iniciar el carrusel
  startAutoplay();
}
