// Subscription page: personalised greeting and an animated redirect countdown.
(function () {
  'use strict';

  const TOTAL_MS = 10000;
  const STEP_MS = 100;
  const HOME_PAGE = 'index.html';

  const card = document.getElementById('subscribedCard');
  const bar = document.getElementById('countdownBar');
  const progress = document.getElementById('countdownProgress');
  const text = document.getElementById('countdownText');
  const cancelButton = document.getElementById('cancelRedirect');

  let elapsed = 0;
  let timerId = null;

  // --- greeting from the URL parameters (textContent keeps it safe from injected HTML) ---
  function showSubscriber() {
    const params = new URLSearchParams(window.location.search);
    const name = (params.get('name') || '').trim().slice(0, 60);
    const email = (params.get('email') || '').trim().slice(0, 100);

    if (name) {
      document.getElementById('subscriberName').textContent = ', ' + name.split(' ')[0];
    }
    if (email) {
      document.getElementById('subscriberEmail').textContent = email;
      document.getElementById('emailNotice').hidden = false;
    }
  }

  // --- countdown ---
  function render() {
    const percent = Math.min(100, Math.round((elapsed / TOTAL_MS) * 100));
    const secondsLeft = Math.ceil((TOTAL_MS - elapsed) / 1000);
    bar.style.width = percent + '%';
    progress.setAttribute('aria-valuenow', String(percent));
    text.textContent = 'Returning to the home page in ' + secondsLeft + (secondsLeft === 1 ? ' second…' : ' seconds…');
  }

  function stopCountdown() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function tick() {
    elapsed += STEP_MS;
    render();
    if (elapsed >= TOTAL_MS) {
      stopCountdown();
      window.location.href = HOME_PAGE;
    }
  }

  function startCountdown() {
    stopCountdown();
    elapsed = 0;
    render();
    timerId = setInterval(tick, STEP_MS);
    cancelButton.textContent = 'Stay on this page';
  }

  if (card && bar && progress && text && cancelButton) {
    showSubscriber();

    // fade the card in (class is added after a short delay so the CSS transition runs)
    card.classList.add('animate-in');
    setTimeout(() => card.classList.add('is-visible'), 100);

    cancelButton.addEventListener('click', () => {
      if (timerId !== null) {
        stopCountdown();
        text.textContent = 'Automatic redirect cancelled.';
        cancelButton.textContent = 'Restart countdown';
      } else {
        startCountdown();
      }
    });

    startCountdown();
  }
})();
