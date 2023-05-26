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
      code: {
        type: 'string',
      },
      importPathReplacer: {
        type: 'string || boolean',
        value: 'process.env.PACKAGE_NAME',
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
      `    PACKAGE_NAME: packageJson.name, // Note: "name" is already a string`,
      `  }),`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
    importPathReplacer: false,
  },
};

const importPathReplacement = [
  `import Replace from './../Replace.mjs';`,
  `import Preserve from './../Preserve.mjs'; // preserve-path`,
  ``,
  `const notAnImport = './../Replace.mjs';`,
];

export const Component = {
  args: {
    code: [`// Component.mjs`, ...importPathReplacement].join('\n'),
    importPathReplacer: false,
  },
};

export const ComponentRaw = {
  args: {
    code: [
      `// Stories of Component.mjs`,
      `import ComponentRaw from './Component.mjs?raw';`,
      ``,
      `<Source code={ComponentRaw} />`,
    ].join('\n'),
    importPathReplacer: false,
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
