// plays video when 50% visible, pauses when scrolled away
const videos = document.querySelectorAll('.step-video');

if (videos.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // play() returns a promise that may be rejected by the browser; ignore it quietly
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(video => observer.observe(video));
}
