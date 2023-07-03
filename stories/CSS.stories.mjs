import Source from '../src/Source.mjs';

export default {
  title: 'Configuration/CSS',
  component: Source,
};

export const CombinedStylesheet = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      `import '@idesigncode/storybook-tools/styles.css';`,
    ].join('\n'),
  },
};

export const SeparateStylesheets = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      ``,
      `// General styles`,
      `import '@idesigncode/storybook-tools/themes.css';`,
      `import '@idesigncode/storybook-tools/storybook.css';`,
      ``,
      `// Component specific styles`,
      `import '@idesigncode/storybook-tools/DefaultValue.css';`,
      `import '@idesigncode/storybook-tools/PropsTable.css';`,
      `import '@idesigncode/storybook-tools/Source.css';`,
    ].join('\n'),
  },
};
