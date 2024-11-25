document.addEventListener('DOMContentLoaded', () => {
  loadHotels();
  loadReviews();
  loadBookingHistory();

  document.getElementById('submit-review').addEventListener('click', submitReview);
});

function loadHotels() {
  // Fetch and display hotels from the API
  fetch('api/hotels.json')
      .then(response => response.json())
      .then(data => {
          const hotelList = document.getElementById('hotel-list');
          data.forEach(hotel => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <h3>${hotel.name}</h3>
                  <p>Location: ${hotel.location}</p>
                  <p>Price: ₹${hotel.price}</p>
                  <button onclick="bookHotel('${hotel.id}')">Book Now</button>
              `;
              hotelList.appendChild(card);
          });
      });
}

function loadReviews() {
  // Load and display reviews from local storage or API
  const reviews = JSON.parse(localStorage.getItem('hotelReviews')) || [];
  const reviewList = document.getElementById('review-list');
  reviews.forEach(review => {
      const reviewItem = document.createElement('p');
      reviewItem.textContent = review;
      reviewList.appendChild(reviewItem);
  });
}

function submitReview() {
  const reviewInput = document.getElementById('review-input');
  const review = reviewInput.value;
  if (review) {
      const reviews = JSON.parse(localStorage.getItem('hotelReviews')) || [];
      reviews.push(review);
      localStorage.setItem('hotelReviews', JSON.stringify(reviews));
      loadReviews();
      reviewInput.value = '';
  }
}

function loadBookingHistory() {
  // Load and display booking history from local storage
  const bookings = JSON.parse(localStorage.getItem('hotelBookings')) || [];
  const bookingHistory = document.getElementById('booking-history');
  bookings.forEach(booking => {
      const bookingItem = document.createElement('p');
      bookingItem.textContent = `Hotel: ${booking.hotelName}, Date: ${booking.date}`;
      bookingHistory.appendChild(bookingItem);
  });
}

function bookHotel(hotelId) {
  // Logic to book a hotel and save to local storage
  const hotelName = document.querySelector(`#hotel-list .card[data-id="${hotelId}"] h3`).textContent;
  const date = new Date().toLocaleDateString();
  const bookings = JSON.parse(localStorage.getItem('hotelBookings')) || [];
  bookings.push({ hotelName, date });
  localStorage.setItem('hotelBookings', JSON.stringify(bookings));
  alert('Hotel booked successfully!');
}