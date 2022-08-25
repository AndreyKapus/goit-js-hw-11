import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages, resetPages } from './fetchPictures';

const form = document.querySelector('.search-form');
const galleryAll = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const btnToTop = document.querySelector('.btn-to-top');
const endOfSerch = document.querySelector('.end-of-serch');
form.addEventListener('submit', onFormSubmit);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

let searchText = '';

const perPage = 40;
let totalPages = 1;
async function onFormSubmit(evt) {
  evt.preventDefault();
  clearCardsContainer();
  resetPages();
  totalPages = 0;
  btnLoadMore.classList.add('is-hidden');
  endOfSerch.classList.add('is-hidden');
  btnToTop.style.display = 'none';
  searchText = evt.currentTarget.searchQuery.value.trim();

  const { totalHits, hits } = await fetchImages(searchText);
  evt.target.reset();

  if (hits.length === 0) {
    alertNoImagesFound();
  } else {
    alertYesImagesFound(totalHits);
    totalPages = Math.ceil(totalHits / perPage);
  }

  if (totalHits > perPage) {
    btnLoadMore.classList.remove('is-hidden');
  }
  window.addEventListener('scroll', onWindowScroll);
  renderCards(hits);
  lightbox.refresh();
}

function createCards(cards) {
  return cards
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a class="gallery__link" href="${largeImageURL}">
    <div class="gallery-item">
    <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
   </div> 
  </div>
  </a>`
    )
    .join('');
}

function renderCards(cards) {
  galleryAll.insertAdjacentHTML('beforeend', createCards(cards));
}

function clearCardsContainer() {
  galleryAll.innerHTML = '';
}

async function onClickLoadMoreBtn(evt) {
  totalPages -= 1;
  const { hits } = await fetchImages(searchText);
  renderCards(hits);

  if (totalPages === 1) {
    btnLoadMore.classList.add('is-hidden');
    alertEndOfSearch();
  }
  lightbox.refresh();
}

function onClickToTopBtn() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  btnToTop.style.display = 'none';
}

function onWindowScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    btnToTop.style.display = 'block';
  }
  if (scrolled < coords) {
    btnToTop.style.display = 'none';
  }
}

function alertNoImagesFound() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertYesImagesFound(hits) {
  Notify.success(`Hooray! We found ${hits} images.`);
}

function alertEndOfSearch() {
  endOfSerch.classList.remove('is-hidden');
}

btnToTop.addEventListener('click', onClickToTopBtn);
btnLoadMore.addEventListener('click', onClickLoadMoreBtn);
