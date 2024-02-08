/**
 * How notifications work:
 *
 * 1. Some code calls store.raiseNotification so new notification object
 * is added to store.ui.notifications
 *
 * 2. Dom element is mounted with zero opacity and after first render it's
 * real height is added to notification object
 *
 * 3. Dom element becomes visible with top offset calculated by sum of
 * previous notifications' heights
 *
 * 4. When it's time to remove notification, it's status at first becomes
 * 'leaving', so dom element becomes fading; after transition end notification object
 * is removed from store.ui.notifications
 *
 * 5. Top offset for other notifications is recalculated, and they smoothly
 * fly to their new position (optimized by using 'translateY' instead of 'top'
 * transition)
 *
 */
import React, { createRef } from 'react';
import cn from 'classnames';
import { IReactionDisposer } from 'mobx';

import { transformers } from 'compSystem/transformers';
import styles from 'comp/notifications/Notifications.scss';
import { Icon } from 'comp/icon';
import { TypeGlobals, TypeNotification } from 'models';
import { AbsViewModel, useStore } from 'hooks/useStore';

type PropsNotification = Omit<TypeNotification, 'delay'> & {
  prevElementsHeight: number;
};

class VM implements AbsViewModel {
  autorunDisposers: Array<IReactionDisposer> = [];

  constructor(public context: TypeGlobals, public props: PropsNotification) {
    transformers.classToObservable(
      this,
      { context: false, props: false, autorunDisposers: false, ref: false },
      { autoBind: true }
    );
  }

  afterMount() {
    this.autorunDisposers.push(transformers.autorun(() => this.trackHeight()));
  }

  ref = createRef<HTMLDivElement>();

  trackHeight() {
    const { store } = this.context;
    const { id } = this.props;
    const { notifications } = store.ui;

    const notificationObservable = notifications.find((n) => id === n.id)!;

    if (store.ui.screen.width == null || !notificationObservable) return;

    transformers.batch(() => {
      notificationObservable.height = this.ref.current!.offsetHeight;
    });
  }

  handleCloseClick() {
    const { id } = this.props;
    const { actions } = this.context;

    void actions.ui.notificationRemove({ id });
  }
}

export function Notification(props: PropsNotification) {
  const { vm } = useStore(VM, props);

  const { status, type, height, message, prevElementsHeight } = props;

  const className = cn({
    [styles.notification]: true,
    [styles[type]]: true,
    [styles.visible]: Boolean(height),
    [styles.leaving]: status === 'leaving',
  });

  const style = { transform: `translateY(${prevElementsHeight}px)` };

  return (
    <div className={className} style={style} ref={vm.ref}>
      <div className={styles.notificationInner}>
        <Icon
          glyph={type === 'error' ? 'alertCircleFill' : 'successCircle'}
          className={styles.icon}
        />
        <div className={styles.message}>{message}</div>
        <Icon glyph={'closeCircle'} className={styles.close} onClick={vm.handleCloseClick} />
      </div>
    </div>
  );
}
