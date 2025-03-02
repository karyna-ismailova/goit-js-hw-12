import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showErrorMessage, showLoader, hideLoader } from './js/render-functions.js';
let currentPage = 1;
let currentQuery = '';
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

document.querySelector('.search-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    
    if (!query) {
        showErrorMessage();
        return;
    }
    if (query !== currentQuery) {
        currentPage = 1;
        currentQuery = query;
        document.querySelector('.gallery').innerHTML = '';
        loadMoreBtn.style.display = 'none';
        hideEndMessage();
    }

    showLoader();
    
    try {
        const { images, totalHits } = await fetchImages(query, currentPage);
        hideLoader();
        if (images.length > 0) {
            renderGallery(images);
            if (totalHits > currentPage * 40) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
                showEndMessage();
            }
            scrollPage();
            
        } else {
            showErrorMessage();
        }
    } catch (error) {
        hideLoader();
        
        showErrorMessage();
    }
});
loadMoreBtn.addEventListener('click', async function () {
    currentPage += 1;
    showLoader();
    try {
        const { images, totalHits } = await fetchImages(currentQuery, currentPage);
        hideLoader();
        if (images.length > 0) {
            
            renderGallery(images, true);
            
            if (totalHits <= currentPage * 40) {
                loadMoreBtn.style.display = 'none';
                showEndMessage();
            } else {
                scrollPage();
            }
        } else {
            loadMoreBtn.style.display = 'none';
            showEndMessage();
        }
    } catch (error) {
        hideLoader();

        showErrorMessage();
    }
});

const scrollPage = () => {
     const galleryItem = document.querySelector('.gallery .gallery-item');
    if (galleryItem) {
        const cardHeight = galleryItem.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2, 
            behavior: 'smooth' 
        });
    }

};


function showEndMessage() {
    const endMessage = document.querySelector('.end-message');
    endMessage.style.display = 'block';
}
function hideEndMessage() {
    const endMessage = document.querySelector('.end-message');
    endMessage.style.display = 'none'; 
}


