const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=29607752-b3abb9abc1baaf34c2e91fe2c';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
let page = 1;
let perPage = 3;

function fetchImages(name) {
    return fetch(`${BASE_URL}${API_KEY}&q=${name}&${OPTIONS}&page=${page}&per_page=${perPage}`).then(response => {
        if (!response.ok) {
            
            throw new Error(response.status);
        }
        return response.json();
    }).then(data => {
        page += 1;
        return data.hits;
    })
}

function resetPage() {
  page = 1;
}


export { fetchImages, resetPage };
