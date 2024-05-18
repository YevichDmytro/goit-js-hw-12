'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getRequest } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.form-search-img');
const inputForm = document.querySelector('.search-input');
const listResults = document.querySelector('.list-results');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

let request = '';
let pageNumber = 1;
let itemsPerPage = 150;

function getResponseFunc(request, itemsPerPage, pageNumber) {
  return getRequest(request, itemsPerPage, pageNumber)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        return iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      createGallery(data.hits);
      lightbox.refresh();
      loadMoreBtn.classList.remove('is-hidden');

      const totalPages = Math.ceil(data.totalHits / itemsPerPage);

      if (pageNumber >= totalPages) {
        iziToast.warning({
          message: 'We`re sorry, but you`ve reached the end of search results.',
          position: 'topRight',
        });
        loadMoreBtn.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}

function searchFormHandler(event) {
  event.preventDefault();

  request = inputForm.value.trim();
  event.target.reset();

  if (!request) {
    return iziToast.warning({
      message: 'The field cannot be empty!',
      position: 'topRight',
    });
  }

  loader.classList.remove('is-hidden');
  listResults.innerHTML = '';
  pageNumber = 1;

  getResponseFunc(request, itemsPerPage, pageNumber);
}

async function pageNumberIncrement() {
  pageNumber += 1;

  loadMoreBtn.classList.add('is-hidden');
  loader.classList.remove('is-hidden');

  await getResponseFunc(request, itemsPerPage, pageNumber);
  smoothScrollOnLoadMore();
}

function smoothScrollOnLoadMore() {
  const lastItemGallery = listResults.querySelector('.item-results:last-child');
  const lastItemGalleryHeight = lastItemGallery.getBoundingClientRect().height;

  window.scrollBy({
    top: lastItemGalleryHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', searchFormHandler);
loadMoreBtn.addEventListener('click', pageNumberIncrement);
