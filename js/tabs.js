class GameTabs {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.tabs = this.container.querySelectorAll('[role="tab"]');
    this.panels = document.querySelectorAll('[role="tabpanel"]');
    this.bindEvents();
  }

  bindEvents() {
    this.tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => this.activateTab(i));
      tab.addEventListener('keydown', (e) => this.handleKey(e, i));
    });
  }

  activateTab(index) {
    this.tabs.forEach((t, i) => {
      const selected = i === index;
      t.setAttribute('aria-selected', selected);
      this.panels[i].hidden = !selected;
    });
  }

  handleKey(e, i) {
    if (e.key === 'ArrowRight') this.activateTab((i + 1) % this.tabs.length);
    if (e.key === 'ArrowLeft') this.activateTab((i - 1 + this.tabs.length) % this.tabs.length);
  }
}

new GameTabs('#gameTabs');
