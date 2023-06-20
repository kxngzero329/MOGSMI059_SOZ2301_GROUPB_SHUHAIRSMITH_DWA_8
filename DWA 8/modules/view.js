// @ts-check
/**
 * html DOM elements
 */
export const html = {
  header: {
    search: document.querySelector('[data-header-search]'),
    settings: document.querySelector('[data-header-settings]'),
  },
  main: {
    list: document.querySelector('[data-list-items]'),
    showMoreButton: document.querySelector('[data-list-button]'),
  },
  list: {
    close: document.querySelector('[data-list-close]'),
    active: document.querySelector('[data-list-active]'),
    message: document.querySelector('[data-list-message]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
  },
  search: {
    cancel: document.querySelector('[data-search-cancel]'),
    overlay: document.querySelector('[data-search-overlay]'),
    genres: document.querySelector('[data-search-genres]'),
    authors: document.querySelector('[data-search-authors]'),
    title: document.querySelector('[data-search-title]'),
    form: document.querySelector('[data-search-form]'),
  },
  settings: {
    theme: document.querySelector('[data-settings-theme]'),
    overlay: document.querySelector('[data-settings-overlay]'),
    cancel: document.querySelector('[data-settings-cancel]'),
    form: document.querySelector('[data-settings-form]'),
  },
};
