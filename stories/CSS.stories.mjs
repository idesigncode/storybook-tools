import { Source } from '@storybook/addon-docs';

export default {
  title: 'Configuration/CSS',
  component: Source,
};

export const CombinedStylesheet = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      `import '@idesigncode/storybook-components/styles.css';`,
    ].join('\n'),
  },
};
