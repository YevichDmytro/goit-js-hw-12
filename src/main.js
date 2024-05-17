'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.form-search-img');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const listResults = document.querySelector('.list-results');
const loadMoreBtn = document.querySelector('.load-more');

let pageNumber = 1;
let request = '';

function formHandler(event) {
  event.preventDefault();

  pageNumber = 1;
  request = input.value.trim();

  if (!request) {
    return iziToast.warning({
      message: 'The field cannot be empty!',
      position: 'topRight',
    });
  }

  loader.classList.toggle('is-hidden');
  listResults.innerHTML = '';

  fetchImg(request, pageNumber)
    .then(({ data }) => {
      event.target.reset();

      if (data.hits.length === 0) {
        return iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      pageNumber += 1;

      createGallery(data.hits);
      lightbox.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.classList.toggle('is-hidden');
    });
}

function pageNumberIncrement() {
  if (pageNumber === 1) {
    return iziToast.error({
      message: 'You can`t load more images!',
      position: 'topRight',
    });
  }

  loader.classList.toggle('is-hidden');

  fetchImg(request, pageNumber)
    .then(({ data }) => {
      createGallery(data.hits);
      lightbox.refresh();

      pageNumber += 1;
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.classList.toggle('is-hidden');
    });
}

searchForm.addEventListener('submit', formHandler);
loadMoreBtn.addEventListener('click', pageNumberIncrement);
