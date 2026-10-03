const burger = document.getElementById('burgerBtn');
const overlay = document.getElementById('navOverlay');
const header = document.querySelector('header');

if (burger && overlay && header) {
  function setOverlayTop() {
    const h = header.offsetHeight;
    overlay.style.top = h + 'px';
    overlay.style.height = `calc(100vh - ${h}px)`;
  }

  setOverlayTop();
  window.addEventListener('resize', setOverlayTop);

  burger.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    burger.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    burger.setAttribute('aria-expanded', String(!isOpen));
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = overlay.contains(event.target);
    const clickedBurger = burger.contains(event.target);

    if (overlay.classList.contains('open') && !clickedInsideMenu && !clickedBurger) {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}
