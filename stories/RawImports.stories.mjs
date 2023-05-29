import Source from '../src/Source.mjs';

export default {
  title: 'Configuration/Raw Imports',
  component: Source,
};

export const Example = {
  args: {
    code: [
      `// Stories of Component.mjs`,
      `import ComponentWithPropsRaw from './ComponentWithProps.mjs?raw';`,
    ].join('\n'),
    importPathReplacements: false,
  },
};

export const WebpackFinalRulesConfig = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `export default {`,
      `  webpackFinal: async (config) => {`,
      `    config.module.rules.map((rule) => {`,
      `      if (!rule.type || rule.type !== 'asset/source') {`,
      `        // ? Ensure any loaders are not run on any 'raw' file imports`,
      `        rule.resourceQuery = { not: [/raw/] };`,
      `      },`,
      `      return rule;`,
      `    });`,
      `    // ...config settings`,
      `    return config;`,
      `  },`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
  },
};
