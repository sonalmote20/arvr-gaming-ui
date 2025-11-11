class GameCarousel {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) return; // ✅ Prevents null errors in Jest
    this.slides = this.container.querySelectorAll('.slide');
    this.index = 0;
    this.bindEvents();
    this.showSlide();
  }

  showSlide() {
    this.slides.forEach((s, i) => {
      s.setAttribute('aria-hidden', i !== this.index);
      s.style.transform = `translateX(${(i - this.index) * 100}%)`;
    });
  }

  next() {
    this.index = (this.index + 1) % this.slides.length;
    this.showSlide();
  }

  prev() {
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.showSlide();
  }

  bindEvents() {
    const nextBtn = document.querySelector('#nextGame');
    const prevBtn = document.querySelector('#prevGame');

    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    let startX = 0;
    if (this.container) {
      this.container.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX));
      this.container.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) this.prev();
        if (diff < -50) this.next();
      });
    }
  }
}

// ✅ Only auto-run in browser, not during Jest tests
if (typeof window !== 'undefined' && document.querySelector('#gameCarousel')) {
  new GameCarousel('#gameCarousel');
}

// ✅ Export for testing
if (typeof module !== 'undefined') module.exports = { GameCarousel };
