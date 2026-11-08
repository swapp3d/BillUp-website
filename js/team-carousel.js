// Our Team carousel (Bootstrap Carousel): the cards are regrouped into pages of 3 / 2 / 1 per view
// depending on screen width. Desktop: mouse wheel moves between pages, mobile: finger swipe
// (built into Bootstrap). Photos that are not added yet fall back to a placeholder.
(function () {
  'use strict';

  const carouselEl = document.getElementById('teamCarousel');
  if (!carouselEl || typeof bootstrap === 'undefined') {
    return;
  }

  const inner = carouselEl.querySelector('.carousel-inner');
  const dotsBox = carouselEl.querySelector('.carousel-indicators');
  const slots = Array.from(carouselEl.querySelectorAll('.team-slot'));

  const WHEEL_LOCK_MS = 800;
  const WHEEL_MIN_DELTA = 4;
  const wideQuery = window.matchMedia('(min-width: 992px)');
  const midQuery = window.matchMedia('(min-width: 768px)');

  let carousel = null;
  let perView = 0;
  let wheelLocked = false;

  function getPerView() {
    if (wideQuery.matches) {
      return 3;
    }
    return midQuery.matches ? 2 : 1;
  }

  function activePage() {
    const index = Array.from(inner.children).findIndex((item) => item.classList.contains('active'));
    return Math.max(index, 0);
  }

  // rebuilds the slides so every page holds exactly `perView` cards, keeping the same member in view
  function build() {
    const newPerView = getPerView();
    if (newPerView === perView) {
      return;
    }

    const firstMember = perView ? activePage() * perView : 0;
    if (carousel) {
      carousel.dispose();
    }

    perView = newPerView;
    const pages = Math.ceil(slots.length / perView);
    const startPage = Math.floor(firstMember / perView);

    inner.textContent = '';
    dotsBox.textContent = '';

    for (let page = 0; page < pages; page++) {
      const item = document.createElement('div');
      item.className = 'carousel-item' + (page === startPage ? ' active' : '');

      const row = document.createElement('div');
      row.className = 'row g-4';
      slots.slice(page * perView, (page + 1) * perView).forEach((slot) => {
        slot.className = 'team-slot col-' + (12 / perView);
        row.appendChild(slot);
      });
      item.appendChild(row);
      inner.appendChild(item);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('data-bs-target', '#teamCarousel');
      dot.setAttribute('data-bs-slide-to', String(page));
      dot.setAttribute('aria-label', 'Show page ' + (page + 1));
      if (page === startPage) {
        dot.className = 'active';
        dot.setAttribute('aria-current', 'true');
      }
      dotsBox.appendChild(dot);
    }

    // no autoplay, finger swipe enabled, endless loop
    carousel = new bootstrap.Carousel(carouselEl, { ride: false, interval: false, touch: true, wrap: true });
    equalizeCards();
  }

  // gives every card the height of the tallest one (also the cards on other pages), so nothing jumps while sliding
  function equalizeCards() {
    carouselEl.style.removeProperty('--team-card-height');

    const items = Array.from(inner.children);
    let tallest = 0;

    items.forEach((item) => {
      const hidden = !item.classList.contains('active');
      if (hidden) {
        // briefly lay the page out invisibly so its cards can be measured
        item.style.cssText = 'display:block;visibility:hidden';
      }
      item.querySelectorAll('.team-card').forEach((card) => {
        tallest = Math.max(tallest, card.offsetHeight);
      });
      if (hidden) {
        item.style.cssText = '';
      }
    });

    if (tallest > 0) {
      carouselEl.style.setProperty('--team-card-height', tallest + 'px');
    }
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeCards, 150);
  }

  // desktop mouse wheel (or sideways trackpad scroll) moves one page at a time
  function onWheel(event) {
    if (!midQuery.matches) {
      return;
    }

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < WHEEL_MIN_DELTA) {
      return;
    }

    event.preventDefault();
    if (wheelLocked) {
      return;
    }

    wheelLocked = true;
    if (delta > 0) {
      carousel.next();
    } else {
      carousel.prev();
    }
    setTimeout(() => { wheelLocked = false; }, WHEEL_LOCK_MS);
  }

  // hide a photo that failed to load so the placeholder behind it shows through
  function handlePhoto(img) {
    img.addEventListener('error', () => { img.hidden = true; });
    if (img.complete && img.naturalWidth === 0) {
      img.hidden = true;
    }
  }

  build();
  wideQuery.addEventListener('change', build);
  midQuery.addEventListener('change', build);
  window.addEventListener('resize', onResize);
  window.addEventListener('load', equalizeCards);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(equalizeCards);
  }
  carouselEl.addEventListener('wheel', onWheel, { passive: false });
  slots.forEach((slot) => slot.querySelectorAll('.team-photo img').forEach(handlePhoto));
})();
