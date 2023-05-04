import '../styles.css';
import DocsContainer from '../src/DocsContainer.mjs';

export const parameters = {
  docs: {
    container: DocsContainer, // TODO - Remove once resolved: https://github.com/hipstersmoothie/storybook-dark-mode/issues/205#issuecomment-1419862816
  },
  viewMode: 'docs',
};
