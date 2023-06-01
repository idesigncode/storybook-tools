import Source from '../src/Source.mjs';

export default {
  title: 'Configuration/Uncompressed Source Code',
  component: Source,
};

export const WebpackFinalRulesConfig = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `export default {`,
      `  webpackFinal: async (config) => {`,
      `    // ? Ensure source code is not compressed and comments preserved`,
      `    config.optimization.minimizer.map((minimizer) => {`,
      `      minimizer.options.minimizer.options.format = { comments: true };`,
      `      minimizer.options.minimizer.options.compress = false;`,
      `      return minimizer;`,
      `    });`,
      `    // ...config settings`,
      `    return config;`,
      `  },`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
  },
};
