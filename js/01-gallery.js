import { galleryItems } from './gallery-items.js';
// Change code below this line

/* Создаём и рендерим разметку */
const galleryContainerRef = document.querySelector('.gallery');

const galleryElementsContent = galleryItems
  .map(
    item =>
      `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
            <img
                loading="lazy"
                class="gallery__image lazyload"
                data-src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
            />
            </a>
       </div>`
  )
  .join('');

galleryContainerRef.innerHTML = galleryElementsContent;

/* Убираем переход по ссылке */
const galleryItemLinksArr = document.querySelectorAll('.gallery__link');

galleryItemLinksArr.forEach(galleryItemLink =>
  galleryItemLink.addEventListener('click', addPreventDefaultOnLink)
);

function addPreventDefaultOnLink(e) {
  e.preventDefault();
}

/* Делегируем клик на картинку через div.gallery и открываем модалку по этому клику */
galleryContainerRef.addEventListener('click', clickOnGalleryItem);

function clickOnGalleryItem(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageUrl = evt.target.dataset.source;
  const imageAlt = evt.target.alt;

  const modalImage = createImageModal(originalImageUrl, imageAlt);
  modalImage.show();

  /* Поскольку при создании модалки инициализирую функцию с аргументами, опирающимися на текущий ивент в данном обработчике - не придумал
     лучшего решения, чем добавить функцию закрытия модалки по эскейпу (именно чтобы по закрытию снимался eventListener на keydown с
     документа) в этот обработчик. Ниже в коде, вне текущего обработчика, закомментил функцию обычного закрытия модалки по эскейпу, но
     она не снимает eventListener, поэтому оставляю такое решение */
  const closeModalByEscapeFunctionInitial = closeModalByEscape(modalImage);

  document.addEventListener('keydown', closeModalByEscapeFunctionInitial);

  function closeModalByEscape(instance) {
    return function (event) {
      if (event.code === 'Escape') {
        instance.close(() => {
          document.removeEventListener('keydown', closeModalByEscapeFunctionInitial);
        });
      }
    };
  }
}

/* Создаёт модалку */
function createImageModal(imgUrl, imgAlt) {
  return basicLightbox.create(
    `
        <img src="${imgUrl}" alt="${imgAlt}" class="modal-image">
    `
  );
}

/* Кроссбраузерный lazyload */
if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(image => {
    image.src = image.dataset.src;
  });
} else {
  const lazyLoadScript = document.createElement('script');
  lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(lazyLoadScript);
}

// function closeModalByEscape(elem) {
//   return function (event) {
//     if (event.code === 'Escape') {
//       elem.close();
//     }
//   };
// }
