const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function() {
    const img = card.querySelector('img').src;
    const title = card.querySelector('h4').textContent;
    const author = card.querySelector('p').textContent;

    modalOverlay.querySelector('h3').textContent = title;
    modalOverlay.querySelector('img').src = img;
    modalOverlay.querySelector('p').textContent = ` by ${author}`;
    modalOverlay.classList.add('active');
  })
}

document.querySelector('#modal-close').addEventListener('click', function() {
  modalOverlay.classList.remove('active');
});

// Close modal when click outside
modalOverlay.addEventListener('click', function() {
  modalOverlay.classList.remove('active');
});

// Prevent close modal when click inside
modalOverlay.querySelector('.modal').addEventListener('click', function(e) {
  e.stopPropagation();
})
