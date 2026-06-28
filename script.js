window.LAUNCH_TIME = "2026-06-28T11:55:00";
// Mobile Menu Hamburger Toggle
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnHamburger = hamburgerBtn.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
}

function openVideoModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();

  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', function(event) {
      if (event.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      faqQuestions.forEach(q => {
        if (q !== this) {
          q.setAttribute('aria-expanded', 'false');
          const answer = q.nextElementSibling;
          if (answer) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
          }
        }
      });

      const newState = !isExpanded;
      this.setAttribute('aria-expanded', newState);

      const answer = this.nextElementSibling;
      if (answer) {
        if (newState) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
        } else {
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
        }
      }
    });
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .scale-up').forEach(el => observer.observe(el));

  const launchTime = new Date(window.LAUNCH_TIME);
const path = window.location.pathname.toLowerCase();

const isIndex =
    path === "/" ||
    path === "" ||
    path.endsWith("/") ||
    path.endsWith("/index.html") ||
    path === "/index.html";

if (new Date() < launchTime && isIndex) {
    window.location.replace("countdown.html");
}
});
