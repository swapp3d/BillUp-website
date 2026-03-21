const burger = document.getElementById('burgerBtn');
const overlay = document.getElementById('navOverlay');
const header = document.querySelector('header');

//position overlay right below navbar
function setOverlayTop() {
  const h = header.offsetHeight;
  overlay.style.top = h + 'px';
  overlay.style.height = `calc(100vh - ${h}px)`;
}

setOverlayTop();
window.addEventListener('resize', setOverlayTop);

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  overlay.classList.toggle('open');
});

//closing overlay when any link is clicked
overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    overlay.classList.remove('open');
  });
});
