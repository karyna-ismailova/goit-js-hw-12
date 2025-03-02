import axios from 'axios';

const API_KEY = '49130705-dcf2ba3ffc1780735e7549732';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;

export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,
            },
        });
        return { images: response.data.hits, totalHits: response.data.totalHits };
    } catch (error) {
        
        return { images: [], totalHits: 0 };
    }
}