const cards = document.querySelectorAll('.card');
const expandButtons = document.querySelectorAll('.expand-button');

for (let card of cards) {
  card.addEventListener('click', function() {
    const id = card.getAttribute('data-id');

    window.location.href = `/recipes/${id - 1}`;
  })
}

for (let button of expandButtons) {
  button.addEventListener('click', function() {
    const id = button.getAttribute('data-js');
    button.va

    button.classList.toggle('hide');
    document.querySelector(`#${id}`).classList.toggle('hide');
    changeButtonText(button);
  });
}

function changeButtonText(button) {
  if (button.classList.contains('hide')) {
    button.innerText = 'show';
  } else {
    button.innerText = 'hide';
  }
}
