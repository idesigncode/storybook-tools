import React from 'react';
import DefaultValue from '../src/DefaultValue.mjs';
import formatNodeToJsxString from '../src/formatNodeToJsxString.mjs';
import PropsTable from '../src/PropsTable.mjs';
import Source from '../src/Source.mjs';

export default {
  title: 'Components/DefaultValue',
  component: DefaultValue,
};

export const Props = {
  args: {
    children: <DefaultValue link="url" type="string" value="any" />,
    props: {
      value: {
        type: 'any',
      },
    },
    hideChildren: true,
  },
  render: (args) => <PropsTable {...args} />,
};

export const AutomaticType = {
  args: {
    value: 'value',
  },
};

export const AutomaticTypeSource = {
  ...AutomaticType,
  render: (args) => {
    return (
      <Source
        code={[
          `// Component.stories.mjs`,
          `import DefaultValue from '@idesigncode/storybook-tools/DefaultValue.mjs';`,
          ``,
          formatNodeToJsxString(<DefaultValue {...args} />),
        ].join('\n')}
      />
    );
  },
};

export const ManualType = {
  args: {
    type: 'array',
    value: 'value',
  },
};

export const ManualTypeWithLink = {
  args: {
    link: 'url',
    type: 'object',
    value: 'value',
  },
};

export const ManualTypeWithLinkSource = {
  ...ManualTypeWithLink,
  render: AutomaticTypeSource.render,
};

export const RefType = {
  args: {
    type: 'ref object',
    value: {
      current: undefined,
    },
  },
};

export const RefTypeSource = {
  ...RefType,
  render: AutomaticTypeSource.render,
};
