import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import formatValueToString from '../src/formatValueToString.mjs';
import PropsTable from '../src/PropsTable.mjs';
import Source from '../src/Source.mjs';
import ComponentExample from './Component.example.mjs';
import Component from './Component.mjs';
import InputExample from './Input.example.mjs';
import InputExampleRaw from './Input.example.mjs?raw';

export default {
  title: 'Components/PropsTable',
  component: PropsTable,
};

export const Props = {
  args: {
    children: (
      <PropsTable
        hideChildren={null}
        props={{
          propName: {
            required: false,
            type: 'string',
            value: 'any',
          },
        }}
      >
        <Component />
      </PropsTable>
    ),
    hideChildren: true,
  },
};
export const AutomaticProps = {
  render: InputExample,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('');
    const td = canvas.getByText('""');

    await step(`Update example component value`, async () => {
      expect(input).not.toHaveValue();
      await userEvent.type(input, 'test');
      expect(input).toHaveValue('test');
    });

    await step(`Prop value in the PropsTable updated`, async () => {
      expect(td).toHaveTextContent('"test"');
    });
  },
};

const InputExampleRawWithoutProps = InputExampleRaw
  // Remove "props" from example component
  .replace(/\s?{?\.*?props}?/gm, '');

export const AutomaticPropsSource = {
  render: () => (
    <Source
      code={[
        `// Input.example.mjs (the "example component")`,
        ...InputExampleRawWithoutProps,
      ].join('\n')}
      removePropsTable={false}
    />
  ),
};

export const RawImport = {
  render: () => (
    <Source
      code={[
        `// Input.stories.mjs`,
        `import InputExampleRaw from './Input.example.mjs?raw';`,
        ``,
        `<Source code={InputExampleRaw} />`,
      ].join('\n')}
      importPathReplacements={false}
    />
  ),
};

const InputExampleRawWithoutPropsComments = InputExampleRawWithoutProps.replace(
  /(<Input\s*)([^]*)(onChange)/g,
  '$1$3',
);

export const RawImportDisplayedSource = {
  render: () => (
    <Source
      code={[
        `// Source code displayed by <Source code={InputExampleRaw} />`,
        ...InputExampleRawWithoutPropsComments,
      ].join('\n')}
    />
  ),
};

export const ManualTypeWithRequired = {
  args: {
    props: {
      onChange: {
        required: false,
        type: 'string',
        value: 'value',
      },
      value: {
        required: false,
        type: 'string',
        value: 'value',
      },
    },
    hideChildren: true,
  },
  render: InputExample,
};

export const ManualTypeWithRequiredSource = {
  render: () => {
    const props = formatValueToString(
      ManualTypeWithRequired.args.props,
      'object',
    );
    return (
      <Source
        code={prettier.format(
          [
            `// Input.example.mjs (the "example component")`,
            InputExampleRawWithoutPropsComments.replace(
              '<PropsTable>',
              `<PropsTable hideChildren={true} props={${props}}>`,
            ),
          ].join('\n'),
          {
            parser: 'babel',
            plugins: [prettierBabel],
          },
        )}
        removePropsTable={false}
      />
    );
  },
};

export const AllPropTypes = {
  render: ComponentExample,
};
