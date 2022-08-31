import axios from "axios";
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

function onSubmitClick(e) {
  e.preventDefault();
  clearGallery();
  refs.loadMore.disabled = false;
  searchQuery = e.target.elements.searchQuery.value.trim();
  resetPage();

  fetchImages(searchQuery).then(data => {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    return data;
  }).then(renderSearchQuery);
}

function onLoadMoreClick() {
  fetchImages(searchQuery).then(data => {
    return data
  }).then(renderSearchQuery).catch(() => {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    refs.loadMore.disabled = true;
  });
}



function renderSearchQuery(queries) {
  console
    const markup = queries.hits.map(({ tags, webformatURL, likes, views, comments, downloads }) => `<div class="photo-card">
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

function clearGallery() {
  refs.gallery.innerHTML = '';
}