import { omit } from 'lodash';
import cn from 'classnames';
import { createRef } from 'react';

import { transformers } from 'compSystem/transformers';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { generateId } from 'utils';

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

export class Ripple extends ConnectedComponent<PropsRipple> {
  rippleRef = createRef<HTMLDivElement>();
  localState = transformers.observable({
    ripples: [] as Array<TypeRipple>,
    eventIsAdded: false,
  });

  handleCreateRipple = (event: MouseEvent) => {
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
  };

  componentDidMount() {
    if (this.rippleRef.current?.parentElement) {
      this.rippleRef.current?.parentElement.addEventListener('mousedown', this.handleCreateRipple);
    }
  }

  componentWillUnmount() {
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

  render() {
    return (
      <div
        className={cn(styles.rippleWrapper, this.ripples.length > 0 && styles.hasRipples)}
        ref={this.rippleRef}
      >
        {this.ripples}
      </div>
    );
  }
}
