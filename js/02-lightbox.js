import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));
function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `<li>
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('');
}
// підключення бібліотеки
const lightbox = new SimpleLightbox('.gallery a', {
  // підлючення даніх з бібліотекі які треба змінити
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});