import React from 'react';
import { DocsContainer as DocsContainerInitial } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import PropTypes from 'prop-types';
import { useDarkMode } from 'storybook-dark-mode';

const dark = 'dark';
const light = 'light';

/**
 * Sets the theme class on a target document element
 * @param {Object} target - the document element to use for classList
 * @param {string} themeClass - the class of the new theme
 */
const setThemeClass = function (target, themeClass) {
  if (!target.classList.contains(themeClass)) {
    target.classList.remove(dark, light);
    target.classList.add(themeClass);
  }
};

const DocsContainer = ({ children, context }) => {
  const theme = useDarkMode() ? themes.dark : themes.light;

  React.useEffect(() => {
    const themeClass = theme === themes.dark ? dark : light;
    setThemeClass(document.documentElement, themeClass);
    setThemeClass(document.body, themeClass);
  }, [theme, setThemeClass]);

  return (
    <DocsContainerInitial context={context} theme={theme}>
      {children}
    </DocsContainerInitial>
  );
};

DocsContainer.propTypes = {
  children: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
};

export default DocsContainer;
