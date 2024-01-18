import { omit } from 'lodash';
import cn from 'classnames';
import React, { createRef } from 'react';
import { IReactionDisposer } from 'mobx';

import { transformers } from 'compSystem/transformers';
import { generateId } from 'utils';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';

import styles from './Ripple.scss';

type PropsRipple = {
  rippleClassName: string;
};

type TypeRipple = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  timeout: ReturnType<typeof setTimeout>;
  animationDuration: string;
};

const RIPPLE_DURATION = 600;

class VM implements AbsViewModel {
  autorunDisposers: Array<IReactionDisposer> = [];

  constructor(public context: TypeGlobals, public props: PropsRipple) {
    transformers.classToObservable(
      this,
      { context: false, props: false, autorunDisposers: false, rippleRef: false },
      { autoBind: true }
    );
  }

  rippleRef = createRef<HTMLDivElement>();
  localState = {
    ripples: [] as Array<TypeRipple>,
    eventIsAdded: false,
  };

  handleCreateRipple(event: MouseEvent) {
    const { ripples } = this.localState;
    const rippleContainer = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

    // Get the longest side
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const halfSize = size / 2;

    const alreadyUsedIds = ripples.map(({ id }) => id);
    const id = generateId({ excludedIds: alreadyUsedIds });

    transformers.batch(() => {
      ripples.push({
        id,
        top: event.clientY - rippleContainer.top - halfSize,
        left: event.clientX - rippleContainer.left - halfSize,
        width: size,
        height: size,
        animationDuration: `${RIPPLE_DURATION}ms`,
        timeout: setTimeout(() => {
          const targetRippleIndex = ripples.findIndex((r) => id === r.id);

          if (targetRippleIndex === -1) return;

          transformers.batch(() => ripples.splice(targetRippleIndex, 1));
        }, RIPPLE_DURATION),
      });
    });
  }

  afterMount() {
    if (this.rippleRef.current?.parentElement) {
      this.rippleRef.current?.parentElement.addEventListener('mousedown', this.handleCreateRipple);
    }
  }

  beforeUnmount() {
    const { ripples } = this.localState;

    ripples.forEach(({ timeout }) => clearTimeout(timeout));

    if (this.rippleRef.current?.parentElement) {
      this.rippleRef.current?.parentElement.removeEventListener(
        'mousedown',
        this.handleCreateRipple
      );
    }
  }

  get ripples() {
    const { rippleClassName } = this.props;

    return this.localState.ripples.map((ripple) => (
      <div
        className={cn(styles.ripple, rippleClassName)}
        key={ripple.id}
        style={omit(ripple, ['timeout'])}
      />
    ));
  }
}

export const Ripple = transformers.observer(function Ripple(props: PropsRipple) {
  const { vm } = useStore(VM, props);

  return (
    <div
      className={cn(styles.rippleWrapper, vm.ripples.length > 0 && styles.hasRipples)}
      ref={vm.rippleRef}
    >
      {vm.ripples}
    </div>
  );
});
