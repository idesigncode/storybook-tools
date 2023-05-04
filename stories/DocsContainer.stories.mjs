import Source from '../src/Source.mjs';

export default {
  title: 'Configuration/DocsContainer',
  component: Source,
};

export const DocsContainerConfig = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      `import DocsContainer from '@idesigncode/storybook-components/DocsContainer.mjs';`,
      ``,
      `export const parameters = {`,
      ` docs: {`,
      `   container: DocsContainer,`,
      `   // ...parameters.docs`,
      ` },`,
      ` // ...parameters`,
      `};`,
    ].join('\n'),
  },
};
