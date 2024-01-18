import React, { createRef, ReactNode } from 'react';
import cn from 'classnames';

import { transformers } from 'compSystem/transformers';
import { Button, PropsButton } from 'comp/button';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';

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

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals, public props: PropsDropdown) {
    transformers.classToObservable(
      this,
      { context: false, props: false, ref: false },
      { autoBind: true }
    );
  }

  afterMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  localState = { isOpen: false };

  ref = createRef<HTMLDivElement>();

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event: MouseEvent) {
    const { onClose } = this.props;
    const { isOpen } = this.localState;

    const shouldOpen = Boolean(!isOpen && this.ref?.current?.contains(event.target as Node));

    transformers.batch(
      () => (this.localState.isOpen = onClose ? onClose(event, shouldOpen) : shouldOpen)
    );
  }
}

export const Dropdown = transformers.observer(function Dropdown(props: PropsDropdown) {
  const { vm } = useStore(VM, props);

  const { isOpen } = vm.localState;
  const {
    children,
    buttonProps,
    tooltipRight,
    tooltipContent,
    wrapperClassName,
    tooltipClassName,
  } = props;

  return (
    <div className={cn(styles.buttonWrapper, wrapperClassName)}>
      <Button {...buttonProps} active={isOpen} forwardRef={vm.ref}>
        {children}
      </Button>
      {isOpen && (
        <div className={cn(styles.tooltip, tooltipRight && styles.right, tooltipClassName)}>
          {tooltipContent}
        </div>
      )}
    </div>
  );
});
