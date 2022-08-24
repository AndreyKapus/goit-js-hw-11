const axios = require('axios').default;
// export { fetchPictures };

export async function fetchPictures(query, page, perPage) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const KEY = '29432159-064ba5645d6ae7f18ff2bb6d2';

  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}
