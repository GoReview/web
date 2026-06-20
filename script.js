const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in, .scale-up').forEach((section) => {
  observer.observe(section);
});

const counters = document.querySelectorAll('.count-up');
const speed = 1800;

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const end = parseInt(el.dataset.value, 10);
      let current = 0;
      const step = Math.max(1, Math.floor(end / (speed / 24)));
      const updateCount = () => {
        current += step;
        el.textContent = current >= end ? `${end}${el.dataset.suffix || ''}` : `${current}${el.dataset.suffix || ''}`;
        if (current < end) requestAnimationFrame(updateCount);
      };
      updateCount();
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach((counter) => counterObserver.observe(counter));

const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const expanded = item.classList.toggle('active');
    btn.setAttribute('aria-expanded', expanded);
    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
  });
});

function openVideoModal(e) {
  e.preventDefault();
  const modal = document.getElementById('videoModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.getElementById('videoModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'videoModal') {
    closeVideoModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
});
