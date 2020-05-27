// Acordion buttons
const $acordionTrigger = document.querySelectorAll('.acordion__toggle');

function changeButtonText(button) {
  if (button.classList.contains('hide')) {
    button.innerText = 'mostrar';
  } else {
    button.innerText = 'esconder';
  }
}

function setAcordionButtons(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', function() {
      const block = button.dataset.block;
  
      button.classList.toggle('hide');
      document.querySelector(`.${block}`).classList.toggle('hide');
      changeButtonText(button);
    });
  }
}

if ($acordionTrigger) setAcordionButtons($acordionTrigger);

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

// Style current header link
const $navLinks = document.querySelectorAll('.menu__row a');

function styleActiveNav($navLinks) {
  const path = location.pathname;

  for (let $link of $navLinks) {
    if (path.includes($link.getAttribute('href'))) {
      $link.classList.add('active');
    }
  }
}

if ($navLinks) styleActiveNav($navLinks);
