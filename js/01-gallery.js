import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));
galleryContainer.addEventListener('click', onImgClick);

function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
                </a>
            </div>`;
    }).join('');
}
function onImgClick(e) {
    // забороняємо перезагрузку і загрузку зображення
    e.preventDefault();
    // перевірка. якщо жмакнули не на картинку(тег IMG) виходь
    if (e.target.nodeName !== "IMG") return;
    // перевіряємо чи є такий клас
    const isItemImage = e.target.classList.contains('gallery__image');
    // якщо не 'gallery__image' виходь
    if (!isItemImage) return;
    // присвоємо датаатрибут data-source= "${original}"
    const currentImgUrl = e.target.dataset.source;
    // підключаємо бібліотеку
    const instance = basicLightbox.create(
        `
        <img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
        // вішаємо слухача події на Esc
        {
            onShow: (instance) => {
                window.addEventListener('keydown', onEscKeyPress);
            },
            onClose: (instance) => {
                window.removeEventListener('keydown', onEscKeyPress);
            },
        }
    );
    // підключаємо велике зображення
    instance.show()
    function onEscKeyPress(e) {
        const ESC_KEY_CODE = 'Escape';
        const isEscKey = e.code === ESC_KEY_CODE;
        //   при натисканні , якщо не Esc виходимо
        if (!isEscKey) return;
        instance.close();
    }
}
