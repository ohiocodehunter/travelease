document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Basic validation
  if (password !== confirmPassword) {
      document.getElementById('error-message').textContent = 'Passwords do not match';
      return;
  }

  // Simulate storing user data (replace with actual storage logic)
  localStorage.setItem('user', JSON.stringify({ username, password }));
  localStorage.setItem('loggedIn', 'true'); // Automatically log in after registration
  window.location.href = 'dashboard.html'; // Redirect to the dashboard
});