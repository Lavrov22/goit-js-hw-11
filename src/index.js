
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages, resetPage } from "./js/fetchImages";
let searchQuery = '';

const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
}


refs.form.addEventListener('submit', onSubmitClick);
refs.loadMore.addEventListener('click', onLoadMoreClick);

hideLoadMore();

function onSubmitClick(e) {
  e.preventDefault();
  clearGallery();
  searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === "") {
    hideLoadMore();
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }
  resetPage();
  showLoadMore();
  disabledLoadMore();
  fetchImages(searchQuery).then(data => {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    return data;
  }).then(data => {
    renderSearchQuery(data);
    enableLoadMore();
  }).catch(error => {
    hideLoadMore();
  });
}

function onLoadMoreClick() {
   disabledLoadMore();
  fetchImages(searchQuery).then(data => {
    return data
  }).then(data => {
    renderSearchQuery(data);
    enableLoadMore();
    scrollSmooth();
  }).catch(() => {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    hideLoadMore();
  });
}



function renderSearchQuery(queries) {
  const markup = queries.hits.map(({ largeImageURL, tags, webformatURL, likes, views, comments, downloads }) =>
  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}"  width=450px height=290px alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
        ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
  </div>`).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

  
function clearGallery() {
  refs.gallery.innerHTML = '';
}

function enableLoadMore() {
  refs.loadMore.disabled = false;
  refs.loadMore.textContent = 'Load more';
}

function disabledLoadMore() {
  refs.loadMore.disabled = true;
  refs.loadMore.textContent = 'Loading...';
}

function showLoadMore() {
  refs.loadMore.classList.remove('is-hidden');
}

function hideLoadMore() {
  refs.loadMore.classList.add('is-hidden');
}

function scrollSmooth() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}