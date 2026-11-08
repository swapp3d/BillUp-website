// Mobile navigation: burger button toggles the full-screen overlay menu
const burger = document.getElementById('burgerBtn');
const overlay = document.getElementById('navOverlay');
const header = document.querySelector('header');

if (burger && overlay && header) {
  // keeps the overlay directly below the sticky header
  function setOverlayTop() {
    const h = header.offsetHeight;
    overlay.style.top = h + 'px';
    overlay.style.height = `calc(100vh - ${h}px)`;
  }

  function setMenuState(isOpen) {
    burger.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  }

  setOverlayTop();
  window.addEventListener('resize', setOverlayTop);

  burger.addEventListener('click', () => {
    setMenuState(!overlay.classList.contains('open'));
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // click outside the menu closes it
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = overlay.contains(event.target);
    const clickedBurger = burger.contains(event.target);

    if (overlay.classList.contains('open') && !clickedInsideMenu && !clickedBurger) {
      setMenuState(false);
    }
  });

  // leaving the mobile layout closes the menu
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  });

  // Escape key closes it too
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });
}
