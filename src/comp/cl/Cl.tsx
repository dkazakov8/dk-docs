import { Collapse } from 'antd';
import React, { ReactNode } from 'react';

import { transformers } from 'compSystem/transformers';

export type TypeItems = Array<{
  label: string;
  children: ReactNode;
}>;

export const Cl = transformers.observer(function Cl(props: { items: TypeItems }) {
  return (
    <Collapse
      size={'middle'}
      ghost
      items={props.items.map((item) => ({ ...item, key: item.label }))}
    />
  );
});
