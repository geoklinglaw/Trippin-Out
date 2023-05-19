import { InputNumber } from 'antd';
import React from 'react';

const NumberInput = ({ onChange }) => {
  const localOnChange = (value) => {
    if (onChange) {
      onChange(value);
    }
    console.log('changed', value);
  };

  return (
    <InputNumber size='large' min={0} max={10} defaultValue={0} onChange={localOnChange} />
  );
};

export default NumberInput;
