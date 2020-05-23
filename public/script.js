// Acordeon buttons
const cards = document.querySelectorAll('.card');
const expandButtons = document.querySelectorAll('.expand-button');

function changeButtonText(button) {
  if (button.classList.contains('hide')) {
    button.innerText = 'mostrar';
  } else {
    button.innerText = 'esconder';
  }
}

function setAcordeonButtons(cards, expandButtons) {
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
}

if (cards && expandButtons) setAcordeonButtons(cards, expandButtons);

// Add input fields on button click
function addField(clonesClass) {
  const inputs = document.querySelectorAll(clonesClass);
  const lastInput = inputs[inputs.length - 1];

  // Do not add a new field if the last one is empty
  if (lastInput.value == "") return false;

  // Clones the last input field
  const newField = lastInput.cloneNode(true);

  // Clear the new input
  newField.value = "";
  inputs[inputs.length - 1].after(newField);
}

if (document.querySelector(".add-ingredient") && document.querySelector(".add-step")) {
  document
    .querySelector(".add-ingredient")
    .addEventListener("click", function() { addField('.ingredient') });
  
  document
    .querySelector(".add-step")
    .addEventListener("click", function() { addField('.step') });
}

