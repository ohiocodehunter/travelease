document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate a login check (replace this with actual authentication logic)
  if (username === 'user' && password === 'password') {
      // Redirect to the dashboard
      window.location.href = 'dashboard.html';
  } else {
      // Show error message
      document.getElementById('error-message').textContent = 'Invalid username or password';
  }
});