import { InputNumber } from 'antd';
import React from 'react';

const onChange = (value) => {
  console.log('changed', value);
};

const Num = () => <InputNumber min={0} max={10} defaultValue={0} onChange={onChange} />;

export default Num;