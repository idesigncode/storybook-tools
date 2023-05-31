import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import formatValueToString from '../src/formatValueToString.mjs';
import PropsTable from '../src/PropsTable.mjs';
import Source from '../src/Source.mjs';
import Component from './Component.mjs';
import ComponentWithProps from './ComponentWithProps.mjs';
import InputWithProps from './InputWithProps.mjs';
import InputWithPropsRaw from './InputWithProps.mjs?raw';

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
  render: InputWithProps,
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

const InputWithPropsRawWithoutProps = InputWithPropsRaw
  // Remove "props" from example component
  .replace(/\s?{?\.*?props}?/gm, '');

export const AutomaticPropsSource = {
  render: () => (
    <Source
      code={[
        `// InputWithProps.mjs (the "example component")`,
        ...InputWithPropsRawWithoutProps,
      ].join('\n')}
      removePropsTable={false}
    />
  ),
};

export const RawImport = {
  render: () => (
    <Source
      code={[
        `// Stories of Input.mjs`,
        `import InputWithPropsRaw from './InputWithProps.mjs?raw';`,
        ``,
        `<Source code={InputWithPropsRaw} />`,
      ].join('\n')}
      importPathReplacements={false}
    />
  ),
};

const InputWithPropsRawWithoutPropsComments =
  InputWithPropsRawWithoutProps.replace(/(<Input\s*)([^]*)(onChange)/g, '$1$3');

export const RawImportDisplayedSource = {
  render: () => (
    <Source
      code={[
        `// Source code displayed by <Source code={InputWithPropsRaw} />`,
        ...InputWithPropsRawWithoutPropsComments,
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
  render: InputWithProps,
};

export const ManualTypeWithRequiredSource = {
  render: () => {
    const props = formatValueToString(
      ManualTypeWithRequired.args.props,
      'object'
    );
    return (
      <Source
        code={prettier.format(
          [
            `// InputWithProps.mjs (the "example component")`,
            InputWithPropsRawWithoutPropsComments.replace(
              '<PropsTable>',
              `<PropsTable hideChildren={true} props={${props}}>`
            ),
          ].join('\n'),
          {
            parser: 'babel',
            plugins: [prettierBabel],
          }
        )}
        removePropsTable={false}
      />
    );
  },
};

export const AllPropTypes = {
  render: ComponentWithProps,
};
