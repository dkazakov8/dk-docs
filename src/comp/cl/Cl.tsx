import { Collapse } from 'antd';
import { ReactNode } from 'react';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';

export type TypeItems = Array<{
  label: string;
  children: ReactNode;
}>;

export class Cl extends ConnectedComponent<{ items: TypeItems }> {
  render() {
    return (
      <Collapse
        size={'middle'}
        ghost
        items={this.props.items.map((item) => ({ ...item, key: item.label }))}
      />
    );
  }
}
