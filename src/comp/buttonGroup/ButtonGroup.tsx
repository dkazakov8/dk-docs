import { ReactNode } from 'react';
import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeRouteValues } from 'routes';
import { Button, PropsButton } from 'comp/button';

import styles from './ButtonGroup.scss';

export type PropsButtonGroup<T extends TypeRouteValues> = {
  buttons: Array<PropsButton<T> & { content: ReactNode }>;
  className?: string;
  noShadow?: boolean;
};

export class ButtonGroup<T extends TypeRouteValues> extends ConnectedComponent<
  PropsButtonGroup<T>
> {
  render() {
    const { buttons, className, noShadow } = this.props;

    return (
      <div className={cn(styles.wrapper, className, noShadow && styles.noShadow)}>
        {buttons.map((props, index) => {
          const { content, ...rest } = props;

          return (
            <Button key={index} {...rest} bordered noShadow>
              {content}
            </Button>
          );
        })}
      </div>
    );
  }
}
