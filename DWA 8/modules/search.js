import { books } from './data.js';
import { html } from './view.js';
/**
 *Creates the "any" option element and appends it to a parent element *
 * @param {HTMLElement | DocumentFragment} fragment - parent element
 * @param {String} optionText - Text to display for the any option
 */
export const createAnyItemOption = (fragment, optionText) => {
  const firstOption = document.createElement('option');
  firstOption.value = 'any';
  firstOption.innerText = `${optionText}`;
  fragment.appendChild(firstOption);
};

/**
 * Creates option element using data from an array.
 * The options are appended to a parent element
 * @param {any} arrayName
 * @param {HTMLElement | DocumentFragment} parentElement - parent element
 */
export const createNamedItemOption = (arrayName, parentElement) => {
  for (const [id, name] of Object.entries(arrayName)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    parentElement.appendChild(element);
  }
};

/**
 * Places books matching the search into an array
 * @param {array} searchResults - array to place books that match the search criteria
 * @param {object} bookItem - single book object
 */
export const addToSearchResults = (searchResults, bookItem) => {
  searchResults.push(bookItem);
};
/**
 * Searches for books matching the user's search criteria
 * @param {object} filters - user search form data
 * @param {array} result - array with the matching books
 */
export const searchBooks = (filters, result) => {
  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      addToSearchResults(result, book);
    }
  }
};
/**
 * Toggles the presence of the search results message
 * @param {array} result - Array of books matching the search
 */
export const toggleSearchResultsMessage = (result) => {
  if (result.length < 1) {
    html.list.message?.classList.add('list__message_show');
  } else {
    html.list.message?.classList.remove('list__message_show');
  }
};
