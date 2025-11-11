class GameModal {
  constructor(selector) {
    this.modal = document.querySelector(selector);
    this.openBtn = document.querySelector('#openGameModal');
    this.closeBtn = document.querySelector('#closeGameModal');
    this.focusable = this.modal.querySelectorAll('button, [tabindex]');
    this.firstFocus = this.focusable[0];
    this.lastFocus = this.focusable[this.focusable.length - 1];
    this.bindEvents();
  }

  open() {
    this.modal.setAttribute('aria-hidden', 'false');
    this.firstFocus.focus();
  }

  close() {
    this.modal.setAttribute('aria-hidden', 'true');
  }

  bindEvents() {
    this.openBtn.addEventListener('click', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if (e.key === 'Tab' && this.modal.getAttribute('aria-hidden') === 'false') {
        if (e.shiftKey && document.activeElement === this.firstFocus) {
          e.preventDefault();
          this.lastFocus.focus();
        } else if (!e.shiftKey && document.activeElement === this.lastFocus) {
          e.preventDefault();
          this.firstFocus.focus();
        }
      }
    });
  }
}

new GameModal('#gameModal');
