import { html } from './view.js';
/**
 * Stores night and day mode settings
 */
export const themeModes = {
  night: {
    colorLight: '10, 10, 20',
    colorDark: '255, 255, 255',
  },
  day: {
    colorDark: '10, 10, 20',
    colorLight: '255, 255, 255',
  },
};
/**
 * Toggles the theme settings
 * @param {string} theme - theme mode setting name
 */
export const toggleThemeMode = (theme) => {
  if (html.settings.theme?.value === `${theme}`) {
    const { colorLight, colorDark } = themeModes[theme];
    document.documentElement.style.setProperty('--color-dark', `${colorDark}`);
    document.documentElement.style.setProperty(
      '--color-light',
      `${colorLight}`
    );
  }
};
/**
 * Changes the theme
 * @param {string} setting
 */
export const changeTheme = (setting) => {
  if (setting === 'night') {
    toggleThemeMode('night');
  } else {
    toggleThemeMode('day');
  }
};

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  html.settings.theme.value = 'night';
  toggleThemeMode('night');
} else {
  html.settings.theme.value = 'day';
  toggleThemeMode('day');
}
