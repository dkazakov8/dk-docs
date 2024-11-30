import cn from 'classnames';
import React, { createRef, MouseEventHandler } from 'react';

import { Button } from 'comp/button';
import { system } from 'const';
import { BodyClass } from 'comp/bodyClass';
import { Icon } from 'comp/icon';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';
import { appendAutorun } from 'utils';

import { messages } from './messages';
import styles from './Confirm.scss';

const transitionDuration = `${system.MODALS_LEAVING_TIMEOUT}ms`;

class VM implements ViewModel {
  modalRef = createRef<HTMLDivElement>();

  constructor(public context: TypeGlobals) {
    classToObservableAuto(__filename, this, ['modalRef', 'beforeOpen']);
  }

  beforeMount() {
    appendAutorun(this, this.beforeOpen);
  }

  beforeOpen() {
    const { store } = this.context;

    if (store.ui.confirm) {
      if (IS_CLIENT) {
        const bodyScrollbarWidth = window.innerWidth - document.body.offsetWidth;

        document.body.style.paddingRight = `${bodyScrollbarWidth}px`;
      }
    } else if (IS_CLIENT) document.body.style.paddingRight = ``;
  }

  handleButtonClick(isConfirmed: boolean) {
    return () => {
      const { actions } = this.context;

      void actions.ui.confirmRemove({ isConfirmed });
    };
  }

  handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    const { store } = this.context;

    const confirm = store.ui.confirm;

    if (
      !confirm ||
      confirm.isLeaving ||
      this.modalRef.current !== event.target ||
      confirm.restrictCloseOnBackdrop
    )
      return;

    this.handleButtonClick(false)();
  };
}

export function Confirm() {
  const { vm, context } = useStore(VM);

  const { store, getLn } = context;

  const confirm = store.ui.confirm;

  if (!confirm) return null;

  const {
    svg,
    icon,
    text,
    title,
    image,
    className,
    isLeaving,
    rejectText,
    confirmText,
    titleComponent,
    buttonsInColumn,
    hideRejectButton,
  } = confirm;

  const buttons = [
    !hideRejectButton && (
      <Button
        key={'reject'}
        type={'grey'}
        className={styles.button}
        onClick={vm.handleButtonClick(false)}
      >
        {rejectText || getLn(messages.reject)}
      </Button>
    ),
    <Button
      key={'approve'}
      type={buttonsInColumn ? 'blue' : 'grey'}
      className={styles.button}
      onClick={vm.handleButtonClick(true)}
    >
      {confirmText || getLn(messages.confirm)}
    </Button>,
  ].filter(Boolean);

  return (
    <div
      className={cn(styles.backdrop, isLeaving && styles.isLeaving)}
      style={{
        zIndex: system.MODALS_BASE_Z_INDEX,
        transitionDuration,
        animationDuration: transitionDuration,
      }}
    >
      <BodyClass isActive className={styles.bodyOverflowHidden} />
      <div
        ref={vm.modalRef}
        style={{ zIndex: system.MODALS_BASE_Z_INDEX + 1 }}
        onClick={vm.handleClickOutside}
        className={cn(styles.modalWrapper, className)}
      >
        <div className={styles.modalContent}>
          {image != null && (
            <div className={styles.imageWrapper}>
              <img src={image} alt={''} />
            </div>
          )}
          {svg != null && (
            <div className={styles.svgWrapper}>
              <span dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
          )}
          {icon != null && <Icon glyph={icon} className={styles.icon} />}
          {titleComponent != null ? titleComponent() : <div className={styles.title}>{title}</div>}
          {text != null && <div className={styles.text}>{text}</div>}
          <div className={cn(styles.buttonsBlock, buttonsInColumn && styles.buttonsInColumn)}>
            {buttonsInColumn ? buttons.reverse() : buttons}
          </div>
        </div>
      </div>
    </div>
  );
}
