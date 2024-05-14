'use strict';

const API_KEY = '43770343-d10c460472ef62dd19f425fcf';
const BASE_URL = `https://pixabay.com/api/`;

export function fetchImg(q) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
