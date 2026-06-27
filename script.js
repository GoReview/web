// Launch Countdown Timer
function initLaunchCountdown() {
  // CHANGE THIS DATE TO YOUR LAUNCH DATE
  // Format: new Date('YYYY-MM-DD HH:mm:ss')
  const launchTime = new Date('2026-06-27 17:59:00');
  const launchDate = launchTime.getTime();
  
  function updateCountdown() {
    const currentTime = new Date().getTime();
    const distance = launchDate - currentTime;
    
    if (distance < 0) {
      const overlay = document.getElementById('launchOverlay');
      if (overlay) {
        overlay.style.animation = 'fadeOut 3s ease forwards';
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 3000);
      }
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

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

// Video Modal Functions
function openVideoModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initLaunchCountdown();
  
  const videoModal = document.getElementById('videoModal');
  
  if (videoModal) {
    videoModal.addEventListener('click', function(event) {
      if (event.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // FAQ Accordion Functionality
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

  // Smooth scroll behavior for navigation links
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

  // Initialize animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .scale-up').forEach(el => {
    observer.observe(el);
  });
});