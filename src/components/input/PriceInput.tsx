import { InputNumber } from 'antd';
import React from 'react';

interface IPriceInput {
  style?: React.CSSProperties | undefined;
}

export default function PriceInput({ style }: IPriceInput) {
  return <InputNumber style={style} decimalSeparator=',' />;
}
