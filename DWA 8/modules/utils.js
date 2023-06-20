/**
 * Toggles the open or closed state of a modal
 * @param {HTMLElement} overlay
 */
export const toggleOverlay = (overlay) => {
  overlay.open = !overlay.open;
};

/**
 * Gets form data places it in an object
 * @param {Event} event
 * @returns {Object}
 */
export const getFormData = (event) => {
  const formData = new FormData(event.target);
  const results = Object.fromEntries(formData);
  return results;
};
