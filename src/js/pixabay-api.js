'use strict';

import axios, { Axios } from 'axios';

const API_KEY = '43770343-d10c460472ef62dd19f425fcf';

export async function getRequest(q, per_page, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });

  axios.defaults.baseURL = `https://pixabay.com/api/`;

  return await axios(`?${searchParams}`);
}
