document.addEventListener('DOMContentLoaded', function () {

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

  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.classList.remove('hidden');
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(function (el) {
      el.textContent = '';
      el.classList.add('hidden');
    });
    document.getElementById('form-success').classList.add('hidden');
  }

});
