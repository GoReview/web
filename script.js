// Video Modal Functions
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

// Close video modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
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
      const faqItem = this.closest('.faq-item');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other open FAQ items
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
      
      // Toggle current FAQ item
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

  // Observe fade-in and scale-up elements
  document.querySelectorAll('.fade-in, .scale-up').forEach(el => {
    observer.observe(el);
  });
});
