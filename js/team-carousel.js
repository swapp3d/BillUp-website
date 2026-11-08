// Our Team carousel: mouse-wheel scrolling on desktop, finger swipe on mobile (built into Bootstrap),
// and graceful placeholders for team photos that are not added yet.
(function () {
  'use strict';

  const carouselEl = document.getElementById('teamCarousel');
  if (!carouselEl || typeof bootstrap === 'undefined') {
    return;
  }

  const WHEEL_LOCK_MS = 700;
  const WHEEL_MIN_DELTA = 4;
  const desktopQuery = window.matchMedia('(min-width: 768px)');

  // no autoplay: the visitor decides when to move on
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, { ride: false, touch: true, wrap: true });
  let wheelLocked = false;

  // desktop cross-fades between members, mobile slides sideways so the swipe feels natural
  function syncMode() {
    carouselEl.classList.toggle('carousel-fade', desktopQuery.matches);
  }

  function onWheel(event) {
    if (!desktopQuery.matches) {
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
    function hideIfBroken() {
      if (img.complete && img.naturalWidth === 0) {
        img.hidden = true;
      }
    }
    img.addEventListener('error', () => { img.hidden = true; });
    hideIfBroken();
  }

  syncMode();
  desktopQuery.addEventListener('change', syncMode);
  carouselEl.addEventListener('wheel', onWheel, { passive: false });
  carouselEl.querySelectorAll('.team-photo img').forEach(handlePhoto);
})();
