import { galleryItems } from './gallery-items.js';
// Change code below this line

/* Создаём и рендерим разметку */
const galleryContainerRef = document.querySelector('.gallery');

const galleryElementsContent = galleryItems
  .map(
    item =>
      `
        <a class="gallery__item" href="${item.original}">
         <img class="gallery__image lazyload" loading="lazy" data-src="${item.preview}" alt="${item.description}" />
        </a>  
      `
  )
  .join('');

galleryContainerRef.innerHTML = galleryElementsContent;

/* Подключение библиотеки галереи SimpleLightBox */
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

/* Кроссбраузерный lazyload */
if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(image => {
    image.src = image.dataset.src;
  });
} else {
  const lazyLoadScript =
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js" integrity="sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>';
  document.body.insertAdjacentHTML('beforeend', lazyLoadScript);
}
