// ======================== CARROUSELS CARD (MOVE TO CAROUSEL.JS) ========================
// Les anciens carrousels multiples sont maintenant gérés de manière universelle par carousel.js

// ======================== CARROUSEL HERO DYNAMIQUE ========================
(function() {
  const wrapper = document.querySelector('.hero-carousel-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.hero-carousel-track');
  const slides = wrapper.querySelectorAll('.hero-carousel-slide');
  const prevBtn = wrapper.querySelector('.hero-carousel-prev');
  const nextBtn = wrapper.querySelector('.hero-carousel-next');
  const dots = wrapper.querySelectorAll('.hero-carousel-dot');

  let currentIndex = 0;
  let autoplayInterval;
  const slideCount = slides.length;
  const autoplayDelay = 3000; // 3 secondes

  // Fonction pour mettre à jour le carrousel
  const updateCarousel = (index) => {
    // Limiter l'index entre 0 et slideCount-1
    if (index < 0) currentIndex = slideCount - 1;
    else if (index >= slideCount) currentIndex = 0;
    else currentIndex = index;

    // Translater le track
    const translateValue = -currentIndex * 100;
    track.style.transform = `translateX(${translateValue}%)`;

    // Mettre à jour les dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Redémarrer l'autoplay
    resetAutoplay();
  };

  // Fonction pour démarrer l'autoplay
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, autoplayDelay);
  };

  // Fonction pour réinitialiser l'autoplay
  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  // Événements des boutons de navigation
  prevBtn.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
  });

  // Événements des points de navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });

  // Pause l'autoplay lors du survol
  wrapper.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  // Reprend l'autoplay lors de la sortie du survol
  wrapper.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  // Démarrer l'autoplay au chargement
  startAutoplay();
})();

/* Duplicate legacy mobile menu handler removed — using modern openMenu/closeMenu flows below */


// ===========================
// MENU MOBILE - BLOCAGE SCROLL CORRIGÉ
// ===========================
const menuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('mobileMenuOverlay');
const menuClose = document.getElementById('mobileMenuClose');

// Sauvegarder la position de scroll
let scrollY = 0;

function openMenu() {
  if (!mobileMenu) return;
  
  // Sauvegarder la position actuelle du scroll
  scrollY = window.scrollY;
  
  // Ajouter les classes pour bloquer le scroll
  document.body.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
  
  // Fixer la position pour éviter le saut
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  
  // Ouvrir le menu
  mobileMenu.classList.add('active');
  if (menuOverlay) menuOverlay.classList.add('active');
}

function closeMenu() {
  if (!mobileMenu) return;
  
  // Fermer le menu
  mobileMenu.classList.remove('active');
  if (menuOverlay) menuOverlay.classList.remove('active');
  
  // Enlever les classes de blocage
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  
  // Restaurer la position
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Revenir à la position sauvegardée
  window.scrollTo(0, scrollY);
}

// Event listeners
if (menuToggle) {
  menuToggle.addEventListener('click', openMenu);
}

if (menuClose) {
  menuClose.addEventListener('click', closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', closeMenu);
}

// Fermer en cliquant sur un lien
const menuLinks = document.querySelectorAll('.mobile-menu-item');
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fermer avec Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});