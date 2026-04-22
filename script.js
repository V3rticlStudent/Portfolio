document.addEventListener('DOMContentLoaded', function () {

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const darkToggle = document.getElementById('dark-mode-toggle');
  const dmIcon     = darkToggle ? darkToggle.querySelector('.dm-icon') : null;

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (dmIcon) dmIcon.textContent = '☀️';
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      if (dmIcon) dmIcon.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      const target   = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');
  const noResults     = document.getElementById('no-results');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {

      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(function (card) {
        const categories = card.getAttribute('data-category') || '';

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      if (noResults) {
        noResults.classList.toggle('hidden', visibleCount > 0);
      }
    });
  });

  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const card    = button.closest('.project-card');
      const details = card.querySelector('.project-details');
      const isHidden = details.classList.contains('hidden');

      if (isHidden) {
        details.classList.remove('hidden');
        button.textContent = 'Hide Details';
      } else {
        details.classList.add('hidden');
        button.textContent = 'Show Details';
      }
    });
  });

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      clearErrors();
      let isValid = true;

      if (name === '') {
        showError('name-error', 'Please enter your name.');
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        showError('email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
      }

      if (message === '') {
        showError('message-error', 'Please enter a message.');
        isValid = false;
      }

      if (isValid) {
        document.getElementById('form-success').classList.remove('hidden');
        form.reset();
      }
    });
  }

  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(function (el) {
      el.textContent = '';
      el.classList.add('hidden');
    });
    const successEl = document.getElementById('form-success');
    if (successEl) successEl.classList.add('hidden');
  }

  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
    });
  } else {
    const imgObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      imgObserver.observe(img);
    });
  }

  const fadeObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(function (section) {
    section.style.animationPlayState = 'paused';
    fadeObserver.observe(section);
  });

});
