import { fetchPictures } from './fetchPictures';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('button');
const input = document.querySelector('input');
const body = document.querySelector('body');

form.addEventListener('submit', onPictureSearch);

let query = '';

async function onPictureSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.searchQuery.value.trim();

  fetchPictures(query);
  try {
    const result = await checkData();
    console.log(result);
  } catch (error) {
    console.log('error');
  }
}

function checkData(data) {
  renderPicture();
}

function renderPicture(data) {
  const markup = data
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
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
      }
    )
    .join('');
  body.insertAdjacentHTML('beforeend', markup);
}
