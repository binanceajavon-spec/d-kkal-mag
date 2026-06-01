// carousel.js - Carrousel dynamique universel avec auto-défilement
// À inclure dans index.html, categorie.html et article.html

class UniversalCarousel {
  constructor(containerId, trackId, leftBtnId, rightBtnId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Support track ID or fallback to querying .carousel-track inside container
    this.track = document.getElementById(trackId) || this.container.querySelector('.carousel-track');
    if (!this.track) return;

    // Support button IDs or fallback to searching within the section structure
    const section = this.container.closest('.featured-carousel-section') || this.container.parentElement;
    this.leftBtn = document.getElementById(leftBtnId) || 
                   (section ? section.querySelector('.carousel-prev, .prev-btn, .nav-btn:first-child') : null) ||
                   document.querySelector(leftBtnId);
                   
    this.rightBtn = document.getElementById(rightBtnId) || 
                    (section ? section.querySelector('.carousel-next, .next-btn, .nav-btn:last-child') : null) ||
                    document.querySelector(rightBtnId);
    
    this.slideIndex = 0;
    this.slideWidth = 0;
    this.autoPlayInterval = null;
    this.isAutoPlaying = true;
    this.speed = options.speed || 3000; // 3 secondes par défaut
    
    this.init();
  }
  
  init() {
    this.calculateDimensions();
    this.updateTrackPosition();
    this.addEventListeners();
    this.startAutoPlay();
    
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.goToSlide(0);
    });
  }
  
  calculateDimensions() {
    const cards = this.track.querySelectorAll('.carousel-card');
    if (cards.length === 0) return;
    
    const card = cards[0];
    const cardWidth = card.offsetWidth;
    // Get exact CSS gap or default to 28px
    const gap = parseInt(window.getComputedStyle(this.track).gap) || 28;
    this.slideWidth = cardWidth + gap;
    this.totalCards = cards.length;
    
    // Calculer combien de cartes sont visibles
    const containerWidth = this.container.offsetWidth;
    this.visibleCards = Math.floor(containerWidth / this.slideWidth);
  }
  
  updateTrackPosition() {
    if (!this.track || !this.slideWidth) return;
    const translateX = -this.slideIndex * this.slideWidth;
    this.track.style.transform = `translateX(${translateX}px)`;
    this.track.style.transition = 'transform 0.5s ease-out';
  }
  
  goToSlide(index) {
    const maxIndex = Math.max(0, this.totalCards - this.visibleCards);
    this.slideIndex = Math.min(Math.max(0, index), maxIndex);
    this.updateTrackPosition();
  }
  
  nextSlide() {
    const maxIndex = Math.max(0, this.totalCards - this.visibleCards);
    if (this.slideIndex < maxIndex) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
    this.updateTrackPosition();
  }
  
  prevSlide() {
    const maxIndex = Math.max(0, this.totalCards - this.visibleCards);
    if (this.slideIndex > 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = maxIndex;
    }
    this.updateTrackPosition();
  }
  
  startAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.nextSlide();
      }
    }, this.speed);
  }
  
  stopAutoPlay() {
    this.isAutoPlaying = false;
  }
  
  resumeAutoPlay() {
    this.isAutoPlaying = true;
  }
  
  resetAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }
  
  addEventListeners() {
    if (this.leftBtn) {
      this.leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.stopAutoPlay();
        this.prevSlide();
        setTimeout(() => this.resumeAutoPlay(), 5000);
      });
    }
    
    if (this.rightBtn) {
      this.rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.stopAutoPlay();
        this.nextSlide();
        setTimeout(() => this.resumeAutoPlay(), 5000);
      });
    }
    
    // Pause au survol
    if (this.container) {
      this.container.addEventListener('mouseenter', () => {
        this.stopAutoPlay();
      });
      
      this.container.addEventListener('mouseleave', () => {
        this.resumeAutoPlay();
      });
    }
  }
  
  // Méthode pour charger dynamiquement les articles depuis Supabase
  async loadArticles(articles) {
    if (!this.track || !articles || articles.length === 0) return;
    
    this.track.innerHTML = '';
    articles.forEach(article => {
      this.track.innerHTML += `
        <div class="carousel-card" onclick="window.location.href='article.html?id=${article.id}'" style="cursor: pointer;">
          <div class="card-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
          </div>
          <div class="card-content">
            <span class="card-category">${(article.category || 'Actualité').toUpperCase()}</span>
            <div class="card-title">${article.title.length > 60 ? article.title.substring(0, 57) + '...' : article.title}</div>
            <div class="card-footer">
              <span>⭐ ${article.read_time || '3'} min read</span>
              <a href="article.html?id=${article.id}" class="read-more">Lire →</a>
            </div>
          </div>
        </div>
      `;
    });
    
    // Recalculer les dimensions après chargement
    setTimeout(() => {
      this.calculateDimensions();
      this.goToSlide(0);
      this.resetAutoPlay();
    }, 100);
  }
}

// Initialisation automatique quand le DOM est chargé
document.addEventListener('DOMContentLoaded', async () => {
  
  // === Carrousel ACTU (index.html) ===
  if (document.getElementById('carouselContainer') && typeof getArticlesByCategory === 'function') {
    const actuArticles = await getArticlesByCategory('Actu');
    if (actuArticles && actuArticles.length > 0) {
      const carousel = new UniversalCarousel('carouselContainer', 'carouselTrack', 'scrollLeftBtn', 'scrollRightBtn', { speed: 3000 });
      await carousel.loadArticles(actuArticles.slice(0, 10));
    }
  }
  
  // === Carrousel TRENDING NOW / EVENT / FAIT DIVERS ===
  // Pour index.html: carouselContainer2 avec catégorie "Fait divers"
  if (document.getElementById('carouselContainer2') && typeof getArticlesByCategory === 'function') {
    let fdArticles = await getTrendingArticlesByCategory('Fait divers');
    if (!fdArticles || fdArticles.length === 0) {
      fdArticles = await getArticlesByCategory('Fait divers');
    }
    if (fdArticles && fdArticles.length > 0) {
      const carousel2 = new UniversalCarousel('carouselContainer2', 'carouselTrack2', 'carouselPrev', 'carouselNext', { speed: 3000 });
      await carousel2.loadArticles(fdArticles.slice(0, 10));
    }
  }
  
  // === Pour categorie.html : carrousel TRENDING NOW ===
  if (document.getElementById('trendingCarousel') && typeof getAllArticles === 'function') {
    const trendingArticles = await getTrendingArticlesByCategory('Tendance');
    let articlesToShow = trendingArticles;
    if (!articlesToShow || articlesToShow.length < 3) {
      articlesToShow = await getAllArticles();
    }
    if (articlesToShow && articlesToShow.length > 0) {
      const trendingCarousel = new UniversalCarousel('trendingCarousel', 'trendingTrack', 'trendingPrevBtn', 'trendingNextBtn', { speed: 3000 });
      await trendingCarousel.loadArticles(articlesToShow.slice(0, 12));
    }
  }
  
  // === Pour article.html : carrousel "À LIRE AUSSI" ===
  if (document.getElementById('relatedCarousel') && typeof getAllArticles === 'function') {
    const relatedArticles = await getAllArticles();
    if (relatedArticles && relatedArticles.length > 0) {
      const relatedCarousel = new UniversalCarousel('relatedCarousel', 'relatedTrack', 'relatedPrevBtn', 'relatedNextBtn', { speed: 3000 });
      await relatedCarousel.loadArticles(relatedArticles.slice(0, 12));
    }
  }
});