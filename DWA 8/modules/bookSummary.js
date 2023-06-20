import { books, authors } from './data.js';
import { toggleOverlay } from './utils.js';
import { html } from './view.js';

/**
 *Changes the content of the book summary overlay
 * @param {object} active - A single book object
 */
export const displayBookSummary = (active) => {
  toggleOverlay(html.list.active);
  html.list.blur.src = active.image;
  html.list.image.src = active.image;
  html.list.title.innerText = active.title;
  html.list.subtitle.innerText = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  html.list.description.innerText = active.description;
};
/**
 *Fetches data of the book that has been selected.
 * @param {Event} event
 * @param {object} active - A single book object
 * @returns
 */
export const findBook = (event, active) => {
  const pathArray = Array.from(event.path || event.composedPath());
  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }
  return active;
};
