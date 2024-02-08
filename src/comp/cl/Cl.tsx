import { Collapse } from 'antd';
import React, { ReactNode } from 'react';

export type TypeItems = Array<{
  label: string;
  children: ReactNode;
}>;

export function Cl(props: { items: TypeItems }) {
  return (
    <Collapse
      size={'middle'}
      ghost
      items={props.items.map((item) => ({ ...item, key: item.label }))}
    />
  );
}
