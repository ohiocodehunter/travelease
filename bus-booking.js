document.addEventListener('DOMContentLoaded', () => {
  loadBuses();
  loadBusReviews();
  loadBusBookingHistory();

  document.getElementById('submit-bus-review').addEventListener('click', submitBusReview);
});

// Function to load bus data from the API
function loadBuses() {
  fetch('api/buses.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const busList = document.getElementById('bus-list');
          data.forEach(bus => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <h3>${bus.name}</h3>
                  <p>Route: ${bus.route}</p>
                  <p>Price: ₹${bus.price}</p>
                  <button onclick="bookBus('${bus.id}', '${bus.name}')">Book Now</button>
              `;
              busList.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching bus data:', error));
}

// Function to load reviews from local storage
function loadBusReviews() {
  const reviews = JSON.parse(localStorage.getItem('busReviews')) || [];
  const busReviewList = document.getElementById('bus-review-list');
  busReviewList.innerHTML = ''; // Clear previous reviews
  reviews.forEach(review => {
      const reviewItem = document.createElement('p');
      reviewItem.textContent = review;
      busReviewList.appendChild(reviewItem);
  });
}

// Function to submit a new review
function submitBusReview() {
  const reviewInput = document.getElementById('bus-review-input');
  const review = reviewInput.value.trim();
  if (review) {
      const reviews = JSON.parse(localStorage.getItem('busReviews')) || [];
      reviews.push(review);
      localStorage.setItem('busReviews', JSON.stringify(reviews));
      loadBusReviews();
      reviewInput.value = ''; // Clear input field
  } else {
      alert('Please enter a review before submitting.');
  }
}

// Function to load booking history
function loadBusBookingHistory() {
  const bookings = JSON.parse(localStorage.getItem('busBookings')) || [];
  const busBookingHistory = document.getElementById('bus-booking-history');
  busBookingHistory.innerHTML = ''; // Clear previous bookings
  bookings.forEach(booking => {
      const bookingItem = document.createElement('p');
      bookingItem.textContent = `Bus: ${booking.busName}, Date: ${booking.date}`;
      busBookingHistory.appendChild(bookingItem);
  });
}

// Function to book a bus
function bookBus(busId, busName) {
  const date = new Date().toLocaleDateString();
  const bookings = JSON.parse(localStorage.getItem('busBookings')) || [];
  bookings.push({ busName, date });
  localStorage.setItem('busBookings', JSON.stringify(bookings));
  alert('Bus booked successfully!');
  loadBusBookingHistory(); // Refresh booking history
}