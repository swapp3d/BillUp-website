// plays video when 50% visible, pauses when scrolled away
const videos = document.querySelectorAll('.step-video');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, { threshold: 0.5 });

videos.forEach(video => observer.observe(video));