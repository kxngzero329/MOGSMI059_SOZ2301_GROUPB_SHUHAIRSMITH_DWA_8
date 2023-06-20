// @ts-check

import { books, authors, genres, BOOKS_PER_PAGE } from './modules/data.js';
import { html } from './modules/view.js';
import {
  createBookPreviewsButtons,
  updateShowMoreButton,
  createBookPreview,
} from './modules/bookPreviews.js';
import {
  createAnyItemOption,
  createNamedItemOption,
  searchBooks,
  toggleSearchResultsMessage,
} from './modules/search.js';
import { changeTheme } from './modules/themes.js';
import { toggleOverlay, getFormData } from './modules/utils.js';
import { displayBookSummary, findBook } from './modules/bookSummary.js';
let matches = books;
export let page = 1;

const starting = document.createDocumentFragment();
const genreHtml = document.createDocumentFragment();
const authorsHtml = document.createDocumentFragment();

// createBookPreviewsButtons(starting, matches, 0, BOOKS_PER_PAGE);
const initialBooksDisplayed = createBookPreview(
  starting,
  matches,
  0,
  BOOKS_PER_PAGE
);
createBookPreviewsButtons(initialBooksDisplayed);

createAnyItemOption(genreHtml, 'All Genres');
createNamedItemOption(genres, genreHtml);
createAnyItemOption(authorsHtml, 'All Authors');
createNamedItemOption(authors, authorsHtml);

html.search.genres?.appendChild(genreHtml);
html.search.authors?.appendChild(authorsHtml);

updateShowMoreButton(matches);

//EVENT LISTENERS
html.search.cancel.addEventListener('click', () => {
  toggleOverlay(html.search.overlay);
});

html.settings.cancel.addEventListener('click', () => {
  toggleOverlay(html.settings.overlay);
});

html.header.search.addEventListener('click', () => {
  toggleOverlay(html.search.overlay);
  html.search.title?.focus();
});

html.header.settings?.addEventListener('click', () => {
  toggleOverlay(html.settings.overlay);
});

html.list.close?.addEventListener('click', () => {
  toggleOverlay(html.list.active);
});

html.settings.form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const { theme } = getFormData(event);
  changeTheme(theme);
  toggleOverlay(html.settings.overlay);
});

html.search.form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const filters = getFormData(event);
  const result = [];

  searchBooks(filters, result);

  page = 1;
  matches = result;

  toggleSearchResultsMessage(result);

  html.main.list.innerHTML = '';
  const newItems = document.createDocumentFragment();
  createBookPreviewsButtons(newItems, result, 0, BOOKS_PER_PAGE);

  updateShowMoreButton(result);

  window.scrollTo({ top: 0, behavior: 'smooth' });
  toggleOverlay(html.search.overlay);
});

html.main.showMoreButton?.addEventListener('click', () => {
  const fragment = document.createDocumentFragment();
  createBookPreviewsButtons(
    fragment,
    matches,
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  );
  page += 1;
});

html.main.list?.addEventListener('click', (event) => {
  let active = null;
  active = findBook(event, active);
  if (active) {
    displayBookSummary(active);
  }
});
