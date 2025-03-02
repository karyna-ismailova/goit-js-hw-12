import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');
const loadingMsg = document.querySelector('.loader');

export function renderGallery(images, append = false) {
    const gallery = document.querySelector('.gallery');
     if (!append) {
        gallery.innerHTML = '';
    }
    const markup = images.map(image => `
        <li class = "list">
        <a href="${image.largeImageURL}" class="gallery-item">
            <img src="${image.webformatURL}" alt="${image.tags}">
            <ul class="info">
                <li>Likes<br>${image.likes}</li>
                <li>Views<br>${image.views}</li>
                <li>Comments<br>${image.comments}</li>
                <li>Downloads<br>${image.downloads}</li>
            </ul>
        </a></li>
    `).join('');
    gallery.insertAdjacentHTML('beforeend', markup); 
      const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

export function showErrorMessage() {
    iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
    });
}

export function showLoader() {
    if (loadingMsg) {
        loadingMsg.style.display = 'block';
    }
}

export function hideLoader() {
    if (loadingMsg) {
        loadingMsg.style.display = 'none';
    }
}
export function showEndMessage() {
    iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
    });
}