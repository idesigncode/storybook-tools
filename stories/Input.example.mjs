import React from 'react';
import PropsTable from '../src/PropsTable.mjs';
import Input from './Input.mjs'; // preserve-path

const InputExample = (props) => {
  const [value, setValue] = React.useState('');

  return (
    <PropsTable {...props}>
      <Input
        // Each prop given to the child component will generate a new PropsTable row
        // The value of each prop is used for the `type` and `value` columns
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </PropsTable>
  );
};

export default InputExample;
