import { fetchPictures } from './fetchPictures';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('button');
const input = document.querySelector('input');

input.addEventListener('input', onPictureSearch);

function onPictureSearch(e) {
  e.preventDefault;
  const searchInput = input.value.trim();
  console.log(searchInput);

  fetchPictures(searchInput).then(checkData).catch(showError);
}
