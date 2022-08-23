import { fetchPictures } from './fetchPictures';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('button');
const input = document.querySelector('input');

form.addEventListener('submit', onPictureSearch);

let query = '';

function onPictureSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.searchQuery.value.trim();

  console.log(query);

  fetchPictures(query).then(checkData).catch(console.log('ошибка'));
}

function checkData(data) {
  if (data !== '') {
    renderPictures(data);
    console.log('Результат промиса');
  }
}

function renderPictures(data) {
  const markup = data
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
