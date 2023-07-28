import { expect } from '@storybook/jest';
import Source from '../src/Source.mjs';
import { webpackFinal } from '../src/storybookConfig.mjs';
import storybookConfigRaw from '../src/storybookConfig.mjs?raw';

export default {
  title: 'Configuration/Webpack',
  component: Source,
};

export const Implementation = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `import { webpackFinal } from "../src/storybookConfig.mjs";`,
      ``,
      `export default {`,
      `  webpackFinal,`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
  },
};

export const ImplementationCustomSettings = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `import { webpackFinal } from "../src/storybookConfig.mjs";`,
      ``,
      `export default {`,
      `  webpackFinal: async (config) => {`,
      `    const updatedConfig = await webpackFinal(config);`,
      `    // ...Apply your custom configuration settings here to \`updatedConfig\``,
      `    return updatedConfig;`,
      `  },`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
  },
};

export const WebpackFinalConfig = {
  args: {
    code: [
      `// @idesigncode/storybook-tools/storybookConfig.mjs`,
      ...storybookConfigRaw.replace(/^\/?\*.*[^]*\*\/\n?/gm, ''),
    ].join('\n'),
  },
};

const configInitial = {
  module: {
    rules: [{}, { type: 'asset/source' }, { type: 'javascript/auto' }],
  },
};

export const WebpackFinal = {
  args: {
    config: JSON.parse(JSON.stringify(configInitial)),
  },
  play: async ({ args, step }) => {
    expect(args.config).toMatchObject(configInitial);

    await step(`Config is updated if given to webpackFinal`, async () => {
      const result = await webpackFinal(args.config);
      expect(result).toMatchObject({
        module: {
          rules: [
            { resourceQuery: { not: [/raw/] } },
            { type: 'asset/source' },
            { resourceQuery: { not: [/raw/] }, type: 'javascript/auto' },
          ],
        },
      });
    });
  },
  render: () => '',
};

export const RawImport = {
  args: {
    code: [
      `// Component.stories.mjs`,
      `import ComponentExampleRaw from './Component.example.mjs?raw';`,
    ].join('\n'),
    importPathReplacements: false,
  },
};
