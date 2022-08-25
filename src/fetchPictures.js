import axios from 'axios';
export { fetchImages, resetPages };

axios.defaults.baseURL = 'https://pixabay.com/api/';

let page = 1;
async function fetchImages(query) {
  const optionParam = new URLSearchParams({
    key: '29432159-064ba5645d6ae7f18ff2bb6d2',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  });

  const { data } = await axios.get(`?${optionParam}`);
  page += 1;

  return data;
}

function resetPages() {
  page = 1;
}
