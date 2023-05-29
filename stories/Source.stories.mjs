import React from 'react';
import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { useDarkMode } from 'storybook-dark-mode';
import PropsTable from '../src/PropsTable.mjs';
import Source from '../src/Source.mjs';

export default {
  title: 'Components/Source',
  component: Source,
};

export const Props = {
  args: {
    children: <Source code="<Component />" removePropsTable={true} />,
    props: {
      dark: {
        type: 'boolean',
        value: 'useDarkMode()',
      },
      importPathReplacements: {
        type: 'string || boolean',
        value: 'process.env.IMPORT_PATH_REPLACEMENTS',
      },
    },
    hideChildren: true,
  },
  render: (args) => <PropsTable {...args} />,
};

export const Code = {
  args: {
    code: `<Source code="<Component />" />`,
  },
  play: async ({ args, canvasElement, step }) => {
    const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');

    await step(`Button onClick will copy code block contents`, async () => {
      expect(navigator.clipboard.writeText).not.toBeCalled();
      await userEvent.click(within(canvasElement).getByText('Copy'));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(args.code);
    });

    clipboardSpy.mockClear();
  },
};

export const Dark = {
  render: () => {
    const isDark = useDarkMode();
    return (
      <Source
        code={`<Source code="<Component />" dark={${!isDark}} />`}
        dark={!isDark}
      />
    );
  },
};

export const Env = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `import * as packageJson from '../package.json';`,
      ``,
      `export default {`,
      `  env: (config) => ({`,
      `    ...config,`,
      `    IMPORT_PATH_REPLACEMENTS: JSON.stringify({`,
      `      // The [value] will replace the [key] matched within an import path`,
      `      '../': '', // ? Remove "parent directory" relative path segments`,
      `      './': '', // ? Remove "current directory" relative path segments`,
      `      'src/': \`\${packageJson.name}/\`, // ? Prepend package name`,
      `    }),`,
      `  }),`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
    importPathReplacements: false,
  },
};

const importPathReplacement = [
  `import Component from '../src/Component.mjs';`,
  `import Preserve from '../src/Preserve.mjs'; // preserve-path`,
  ``,
  `const notAnImport = '../src/notAnImport.mjs';`,
];

export const Component = {
  args: {
    code: [
      `// ComponentWithProps.mjs (the "example component")`,
      ...importPathReplacement,
    ].join('\n'),
    importPathReplacements: false,
  },
};

export const ComponentRaw = {
  args: {
    code: [
      `// Stories of Component.mjs`,
      `import ComponentWithPropsRaw from './ComponentWithProps.mjs?raw';`,
      ``,
      `<Source code={ComponentWithPropsRaw} />`,
    ].join('\n'),
    importPathReplacements: false,
  },
};

export const ComponentRawDisplayedSource = {
  args: {
    code: [
      `// Source code displayed by <Source code={ComponentRaw} />`,
      ...importPathReplacement,
    ].join('\n'),
  },
};
