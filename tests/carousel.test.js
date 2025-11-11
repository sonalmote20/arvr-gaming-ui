/**
 * @jest-environment jsdom
 */

const { GameCarousel } = require('../js/carousel');

describe('GameCarousel', () => {
  let carousel;

  beforeEach(() => {
    // Create DOM *before* creating carousel instance
    document.body.innerHTML = `
      <div id="gameCarousel">
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <button id="prevGame"></button>
        <button id="nextGame"></button>
      </div>
    `;
    carousel = new GameCarousel('#gameCarousel');
  });

  test('Carousel next() updates index', () => {
    carousel.next();
    expect(carousel.index).toBe(1);
  });

  test('Carousel prev() wraps to last slide', () => {
    carousel.prev();
    expect(carousel.index).toBe(2);
  });
});
