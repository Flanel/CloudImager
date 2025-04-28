// Feedback form handling
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (name && email && message) {
    // Form validation passed
    // (Simulate sending feedback to a server here)
    this.reset();
    feedbackSuccess.style.display = 'block';
    setTimeout(() => feedbackSuccess.style.display = 'none', 5000);
  }
});
