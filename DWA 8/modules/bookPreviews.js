//this is the main part of this challenge which was to create an encapsulated abstraction of the book preview by means of a single factory function.

import { html } from './view.js';
import { authors, books } from './data.js';
import { BOOKS_PER_PAGE } from './data.js';
import { page } from '../scripts.js';
/**
 * Creates objects of books
 * @param {DocumentFragment} parentElement
 * @param {Array} arraySource
 * @param {Number} startOfSlice
 * @param {Number} endOfSlice
 * @returns
 */
export const createBookPreview = (
  parentElement,
  arraySource,
  startOfSlice,
  endOfSlice
) => {
  return {
    parentElement,
    arraySource,
    startOfSlice,
    endOfSlice,
    buttonInnerHtml(image, title, author, authors) {
      return `
    <img
        class="preview__image"
        src="${image}"
    />
  
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
  `;
    },
  };
};
/**
 * Creates book preview buttons from a slice of the matches array {@link matches}.
 * The buttons are them appended to a parent element.
 * @param {HTMLElement | DocumentFragment} parentElement - The parent element to which the preview will be attached
 * @param {Array} arraySource - Array that contains the slice details
 * @param {number} startOfSlice - The starting array index number of the slice
 * @param {number} endOfSlice - The ending array index number of the slice
 */
export const createBookPreviewsButtons = ({
  parentElement,
  arraySource,
  startOfSlice,
  endOfSlice,
  buttonInnerHtml,
}) => {
  for (const { author, id, image, title } of arraySource.slice(
    startOfSlice,
    endOfSlice
  )) {
    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', id);
    element.innerHTML = buttonInnerHtml(image, title, author, authors);
    parentElement.appendChild(element);
  }
  html.main.list?.appendChild(parentElement);
};

/**
 * Calculates the number of books that haven't been displayed yet
 * @param {Array} array - The array of books that are being displayed
 * @returns {number}
 */
const remainingBooks = (array) => {
  return array.length - page * BOOKS_PER_PAGE > 0
    ? array.length - page * BOOKS_PER_PAGE
    : 0;
};
/**
 * Updates the state of the show more button (number of books remaining)
 * whether the button is enabled.
 * @param {array} array - Array of book that are being displayed
 */
export const updateShowMoreButton = (array) => {
  if (remainingBooks !== 0) {
    html.main.showMoreButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks(array)})</span>
    `;
  } else {
    html.main.showMoreButton?.disabled;
  }
};
