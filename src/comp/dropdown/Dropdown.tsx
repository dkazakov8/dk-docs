import { createRef, ReactNode } from 'react';
import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { transformers } from 'compSystem/transformers';
import { Button, PropsButton } from 'comp/button';

import styles from './Dropdown.scss';

type PropsDropdown = {
  tooltipContent: ReactNode;
  buttonProps: PropsButton<any>;
  wrapperClassName?: string;
  children?: ReactNode;
  tooltipRight?: boolean;
  tooltipClassName?: string;
  onClose?: (event: MouseEvent, shouldOpen: boolean) => boolean;
};

export class Dropdown extends ConnectedComponent<PropsDropdown> {
  localState = transformers.observable({
    isOpen: false,
  });

  ref = createRef<HTMLDivElement>();

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const { onClose } = this.props;
    const { isOpen } = this.localState;

    const shouldOpen = Boolean(!isOpen && this.ref?.current?.contains(event.target as Node));

    transformers.batch(
      () => (this.localState.isOpen = onClose ? onClose(event, shouldOpen) : shouldOpen)
    );
  };

  render() {
    const { isOpen } = this.localState;
    const {
      children,
      buttonProps,
      tooltipRight,
      tooltipContent,
      wrapperClassName,
      tooltipClassName,
    } = this.props;

    return (
      <div className={cn(styles.buttonWrapper, wrapperClassName)}>
        <Button {...buttonProps} active={isOpen} forwardRef={this.ref}>
          {children}
        </Button>
        {isOpen && (
          <div className={cn(styles.tooltip, tooltipRight && styles.right, tooltipClassName)}>
            {tooltipContent}
          </div>
        )}
      </div>
    );
  }
}
