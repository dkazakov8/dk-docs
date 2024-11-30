import cn from 'classnames';
import React, { createRef } from 'react';
import { runInAction } from 'mobx';

import { classToObservableAuto } from 'compSystem/transformers';
import { generateId } from 'utils';
import { useStore, ViewModel } from 'hooks/useStore';
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

class VM implements ViewModel {
  constructor(
    public context: TypeGlobals,
    public props: PropsRipple
  ) {
    classToObservableAuto(__filename, this, ['rippleRef']);
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

    runInAction(() => {
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

          runInAction(() => ripples.splice(targetRippleIndex, 1));
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

    return this.localState.ripples.map((ripple) => {
      const style: Omit<TypeRipple, 'timeout'> = {
        id: ripple.id,
        top: ripple.top,
        left: ripple.left,
        width: ripple.width,
        height: ripple.height,
        animationDuration: ripple.animationDuration,
      };

      return <div className={cn(styles.ripple, rippleClassName)} key={ripple.id} style={style} />;
    });
  }
}

export function Ripple(props: PropsRipple) {
  const { vm } = useStore(VM, props);

  return (
    <div
      className={cn(styles.rippleWrapper, vm.ripples.length > 0 && styles.hasRipples)}
      ref={vm.rippleRef}
    >
      {vm.ripples}
    </div>
  );
}
