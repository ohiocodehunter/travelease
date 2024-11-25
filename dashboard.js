document.addEventListener('DOMContentLoaded', function () {
  loadDynamicContent();
  
  // Logout functionality
  document.getElementById('logout-button').addEventListener('click', function() {
      window.location.href = 'login.html'; // Redirect to login page
  });
});

function loadDynamicContent() {
  // Simulate fetching data
  const data = [
      { title: 'Upcoming Trips', description: 'You have 3 upcoming trips.', views: 100 },
      { title: 'Travel History', description: 'You have traveled to 5 countries.', views: 50 },
{ title: 'Pending Requests', description: 'You have 2 pending requests.', views: 20 }
  ];

  displayData(data);
}

function displayData(data) {
  const contentDiv = document.getElementById('dynamic-content');
  contentDiv.innerHTML = ''; // Clear previous content

  data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'data-item';
      itemDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span>Views: ${item.views}</span>
      `;
      contentDiv.appendChild(itemDiv);
  });
}
``` ### 3. Implementing Session Management

To ensure that users cannot access the dashboard without logging in, you can implement a simple session management system using local storage.

**JavaScript (login.js)**

```
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate a login check (replace this with actual authentication logic)
  if (username === 'user' && password === 'password') {
      localStorage.setItem('loggedIn', 'true'); // Set login status
      window.location.href = 'dashboard.html'; // Redirect to the dashboard
  } else {
      document.getElementById('error-message').textContent = 'Invalid username or password';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Check if user is logged in
  if (!localStorage.getItem('loggedIn')) {
      window.location.href = 'login.html'; // Redirect to login if not logged in
  }

  loadDynamicContent();
  
  // Logout functionality
  document.getElementById('logout-button').addEventListener('click', function() {
      localStorage.removeItem('loggedIn'); // Remove login status
      window.location.href = 'login.html'; // Redirect to login page
  });
});