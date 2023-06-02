import packageJson from '../package.json';
import { webpackFinal } from '../src/storybookConfig.mjs';

export default {
  addons: [
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['**/src/**'],
        },
      },
    },
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  docs: {
    autodocs: 'tag',
  },
  env: (config) => ({
    ...config,
    IMPORT_PATH_REPLACEMENTS: JSON.stringify({
      '^': `${packageJson.name}/`, // ? Prepend package name to relative paths
      '../': '', // ? Remove "parent directory" relative path segments
      './': '', // ? Remove "current directory" relative path segments
      'src/': '', // ? Remove "src directory" path segments
    }),
  }),
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../!(node_modules)/**/*.mdx', '../!(node_modules)/**/*.stories.*'],
  storyIndexers: (indexers) => {
    // ? Extend js story indexer for mjs
    return indexers.map((indexer) => {
      if (`${indexer.test}`.includes(`[tj]sx?$`)) {
        return {
          ...indexer,
          test: /(stories|story)\.m?[tj]sx?$/,
        };
      }
      return indexer;
    });
  },
  webpackFinal,
};
