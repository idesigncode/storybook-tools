export default {
  addons: [
    '@storybook/addon-coverage',
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
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
  webpackFinal: async (config) => {
    config.module.rules.map((rule) => {
      if (!rule.type || rule.type !== 'asset/source') {
        // ? Ensure any loaders are not run on any 'raw' file imports
        rule.resourceQuery = { not: [/raw/] };
      }
      return rule;
    });
    return config;
  },
};
