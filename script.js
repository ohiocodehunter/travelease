// script.js

// Function to handle user registration
document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simulate registration process (replace with actual API call)
  console.log('User  Registered:', { username, email, password });
  alert('Registration successful! Please log in.');
  window.location.href = 'login.html';
});

// Function to handle user login
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate login process (replace with actual API call)
  console.log('User  Logged In:', { username, password });
  alert('Login successful! Redirecting to dashboard...');
  window.location.href = 'dashboard.html';
});

// Function to load upcoming bookings (dummy data)
function loadUpcomingBookings() {
  const bookings = [
      { id: 1, destination: 'Paris', date: '2023-12-01' },
      { id: 2, destination: 'New York', date: '2023-12-15' }
  ];
  const bookingList = document.getElementById('upcoming-bookings-list');
  bookings.forEach(booking => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Booking to ${booking.destination} on ${booking.date}`;
      bookingList.appendChild(listItem);
  });
}

// Call loadUpcomingBookings on dashboard page
if (document.getElementById('upcoming-bookings-list')) {
  loadUpcomingBookings();
}

/// dashboard
document.addEventListener('DOMContentLoaded', function () {
  loadDashboardData();
});

function loadDashboardData() {
  // Example API endpoint
  fetch('https://api.example.com/dashboard-data')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          displayDashboardData(data);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

function displayDashboardData(data) {
  const dashboardContent = document.getElementById('dashboard-content');
  // Clear previous content
  dashboardContent.innerHTML = '';

  // Example of displaying data
  data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'dashboard-item';
      div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
      dashboardContent.appendChild(div);
  });
}