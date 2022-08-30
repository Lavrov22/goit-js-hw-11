import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { fetchImages, resetPage } from "./js/fetchImages";

let searchQuery = '';
const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
}

refs.form.addEventListener('submit', onSubmitClick);
refs.loadMore.addEventListener('click', onLoadMoreClick);

function onSubmitClick(e) {
    e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  resetPage();
  fetchImages(searchQuery).then(renderSearchQuery);
}

function onLoadMoreClick() {
  fetchImages(searchQuery).then(renderSearchQuery);
}



function renderSearchQuery(queries) {
    const markup = queries.map(({ tags, webformatURL, likes, views, comments, downloads }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
}

