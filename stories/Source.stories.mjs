import React from 'react';
import { expect, jest } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { useDarkMode } from 'storybook-dark-mode';
import packageJson from '../package.json';
import PropsTable from '../src/PropsTable.mjs';
import Source from '../src/Source.mjs';

export default {
  title: 'Components/Source',
  component: Source,
};

export const Props = {
  args: {
    children: (
      <Source
        code="<Component />"
        format={true}
        removePropsTable={true}
        removeTrailingSemicolon={false}
      />
    ),
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
      const button = await waitFor(() =>
        within(canvasElement).getByText('Copy'),
      );
      await userEvent.click(button);
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

export const Unformatted = {
  args: {
    code: `<Source code="This would cause line wrapping if format was enabled" format={false} />`,
    format: false,
  },
};

const componentWithProps = [
  `import Component from '../src/Component.mjs';`,
  `import Preserve from '../src/Preserve.mjs'; // preserve-path`,
  ``,
  `const notAnImport = '../src/notAnImport.mjs';`,
];

export const ComponentExample = {
  args: {
    code: [
      `// Component.example.mjs (the "example component")`,
      ...componentWithProps,
    ].join('\n'),
    importPathReplacements: false,
  },
};

export const ComponentExampleRaw = {
  args: {
    code: [
      `// Component.stories.mjs`,
      `import ComponentExampleRaw from './Component.example.mjs?raw';`,
      `import packageJson from '../package.json';`,
      ``,
      `<Source`,
      `  code={ComponentExampleRaw}`,
      `  importPathReplacements={JSON.stringify({`,
      `    '^': \`\${packageJson.name}/\`, // Prepend package name to relative paths`,
      `    '../': '', // Remove "parent directory" relative path segments`,
      `    './': '', // Remove "current directory" relative path segments`,
      `    'src/': 'dist/', // Replace "src/" with "dist/"`,
      `  })}`,
      `/>`,
    ].join('\n'),
    importPathReplacements: false,
  },
};

export const ComponentExampleRawDisplayedSource = {
  args: {
    code: [
      `// Source code displayed with "importPathReplacements" applied`,
      ...componentWithProps,
    ].join('\n'),
    importPathReplacements: JSON.stringify({
      '^': `${packageJson.name}/`,
      '../': '',
      './': '',
      'src/': 'dist/',
    }),
  },
};
