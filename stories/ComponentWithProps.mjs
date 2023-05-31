import React from 'react';
import PropsTable from '../src/PropsTable.mjs';
import Component from './Component.mjs';

export const Input = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));
Input.displayName = 'Input';

const ComponentWithProps = () => {
  const ref = React.useRef();

  return (
    <React.Fragment>
      <PropsTable hideChildren={true}>
        <Component
          array={[
            [],
            true,
            Input,
            function () {},
            <Input key={Input} />,
            null,
            1,
            { string: 'string' },
            ref,
            'string',
            undefined,
          ]}
          boolean={true}
          elementType={Component}
          function={function () {}}
          node={<Component as={Input} />}
          null={null}
          number={1}
          object={{
            array: [],
            boolean: true,
            elementType: Component,
            function: function () {},
            node: document.createElement('div'),
            null: null,
            number: 0,
            object: {},
            ref,
            string: 'string',
            undefined: undefined,
          }}
          ref={ref}
          string="string"
          undefined={undefined}
        />
      </PropsTable>
      <Input style={{ display: 'none' }} />
    </React.Fragment>
  );
};

export default ComponentWithProps;
