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
const $addFieldBruttons = document.querySelectorAll('.add-field');
if ($addFieldBruttons) {
  addListenerToFieldButton($addFieldBruttons);
}

function addListenerToFieldButton(buttons) {
  for (let button of buttons) {
    const field = button.dataset.field;
    button.addEventListener('click', function() { addField(field) });
  }
}

function addField(clonesClass) {
  const $inputs = document.querySelectorAll(`.form__input--${clonesClass}`);
  const $lastInput = $inputs[$inputs.length - 1];

  // Do not add a new field if the last one is empty
  if ($lastInput.value == "") return false;

  // Clones the last input field
  const $newField = $lastInput.cloneNode(true);

  // Clear the new input
  $newField.value = "";
  $inputs[$inputs.length - 1].after($newField);
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

// Pagination
function paginate(selectedPage, totalPages) {
  let pages = [],
  oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage === 1 || currentPage === totalPages;
    const pageAfterSelectedPage = currentPage <= selectedPage + 2;
    const pageBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || pageAfterSelectedPage && pageBeforeSelectedPage) {

      if (oldPage && currentPage - oldPage > 2) {
        pages.push('...');
      }
      
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }

  return pages;
}

function createPagination(pagination) {
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if (String(page).includes('...')) {
      elements += `<span>${page}</span>`;
    } else {
      elements += `<a href="?page=${page}" >${page}</a>`;
    }
  }

  pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');

if (pagination) createPagination(pagination);

// Chefs Avatar upload
const ChefAvatarUpload = {
  fileInput: document.querySelector('#photos__input--chef'),
  urlInput: document.querySelector('.form__input--avatar'),
  showUrlInput() {
    this.urlInput.classList.remove('hidden');
  },
  handleFileInput() {
    this.showUrlInput();
    this.urlInput.textContent = this.fileInput.files[0].name;
  }
};

// Recipes files upload
const PhotosUpload = {
  input: undefined,
  preview: document.querySelector('.photos-preview'),
  uploadLimit: 5,
  files: [],
  hasLimitOverflow(event) {
    const { input, preview, uploadLimit } = this;
    const { files: filesList } = input;

    if (filesList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos!`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];
    preview.childNodes.forEach(child => {
      if (child.classList && child.classList.value === 'photos-preview__item') photosDiv.push(child);
    });

    const totalPhotos = filesList.length + photosDiv.length;
    if (totalPhotos > uploadLimit) {
      alert('Você atingiu o limite máximo de fotos!');
      event.preventDefault();
      return true;
    }

    return false;
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer;

    this.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  handleFileInput(event) {
    const { files: filesList } = event.target;
    this.input = event.target;

    if (this.hasLimitOverflow(event)) {
      this.updateInputFiles();
      return;
    }
    
    Array.from(filesList).forEach(file => {
      this.files.push(file);
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = this.getContainer(image);
        this.preview.appendChild(container);
      }

      reader.readAsDataURL(file);
    });

    this.updateInputFiles();
  },
  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photos-preview__item');

    container.appendChild(image);
    container.onclick = this.removePhoto;
    container.appendChild(this.getRemoveButton());

    return container;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.textContent = 'close';
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;

    const newFiles = Array.from(PhotosUpload.preview.children).filter(file => (
      file.classList.contains('photos-preview__item') && !file.getAttribute('id')
    ));

    const index = newFiles.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);

    PhotosUpload.updateInputFiles();

    photoDiv.remove();
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"');

      if (removedFiles) removedFiles.value += `${photoDiv.id},`;

      photoDiv.remove();
    }
  },
  updateInputFiles() {
    this.input.files = this.getAllFiles();
  }
};

const PhotoGallery = {
  banner: document.querySelector('.banner > img'),
  galleryItems: document.querySelectorAll('.gallery__item img'),
  setBannerImage(e) {
    PhotoGallery.galleryItems.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');

    PhotoGallery.banner.src = e.target.src;
    PhotoGallery.banner.alt = e.target.alt;
  }
}
