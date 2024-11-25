document.addEventListener('DOMContentLoaded', () => {
  loadCars();
  loadCarReviews();
  loadCarBookingHistory();

  document.getElementById('submit-car-review').addEventListener('click', submitCarReview);
});

function loadCars() {
  fetch('api/cars.json')
      .then(response => response.json())
      .then(data => {
          const carList = document.getElementById('car-list');
          data.forEach(car => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <h3>${car.name}</h3>
                  <p>Price: ₹${car.price}</p>
                  <button onclick="bookCar('${car.id}')">Book Now</button>
              `;
              carList.appendChild(card);
          });
      });
}

function loadCarReviews() {
  const reviews = JSON.parse(localStorage.getItem('carReviews')) || [];
  const carReviewList = document.getElementById('car-review-list');
  reviews.forEach(review => {
      const reviewItem = document.createElement('p');
      reviewItem.textContent = review;
      carReviewList.appendChild(reviewItem);
  });
}

function submitCarReview() {
  const reviewInput = document.getElementById('car-review-input');
  const review = reviewInput.value;
  if (review) {
      const reviews = JSON.parse(localStorage.getItem('carReviews')) || [];
      reviews.push(review);
      localStorage.setItem('carReviews', JSON.stringify(reviews));
      loadCarReviews();
      reviewInput.value = '';
  }
}

function loadCarBookingHistory() {
  const bookings = JSON.parse(localStorage.getItem('carBookings')) || [];
  const carBookingHistory = document.getElementById('car-booking-history');
  bookings.forEach(booking => {
      const bookingItem = document.createElement('p');
      bookingItem.textContent = `Car: ${booking.carName}, Date: ${booking.date}`;
      carBookingHistory.appendChild(bookingItem);
  });
}

function bookCar(carId) {
  const carName = document.querySelector(`#car-list .card[data-id="${carId}"] h3`).textContent;
  const date = new Date().toLocaleDateString();
  const bookings = JSON.parse(localStorage.getItem('carBookings')) || [];
  bookings.push({ carName, date });
  localStorage.setItem('carBookings', JSON.stringify(bookings));
  alert('Car booked successfully!');
}