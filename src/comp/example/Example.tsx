import React, { ReactNode } from 'react';

import { Button } from 'comp/button';
import { transformers } from 'compSystem/transformers';
import { Sh } from 'comp/sh';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';

import styles from './Example.scss';

type PropsExample = {
  code: string;
  children: ReactNode;
  description?: string;
};

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals, public props: PropsExample) {
    transformers.classToObservable(this, { context: false, props: false }, { autoBind: true });
  }

  localState = {
    codeOpen: false,
  };

  handleToggleCode() {
    this.localState.codeOpen = !this.localState.codeOpen;
  }
}

export function Example(props: PropsExample) {
  const { vm } = useStore(VM, props);

  const { children, code, description } = props;
  const { codeOpen } = vm.localState;

  return (
    <div className={styles.example}>
      <div className={styles.exampleBlock}>{children}</div>
      <div className={styles.exampleBottom}>
        <div className={styles.description}>{description}</div>
        <Button
          type={'white'}
          iconOnly={'code'}
          className={styles.codeButton}
          noShadow
          onClick={vm.handleToggleCode}
        />
      </div>
      {codeOpen && (
        <div className={styles.code}>
          <Sh
            noExpand
            code={[
              {
                fileName: 'Example',
                code,
                language: 'tsx',
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
