import { ReactNode } from 'react';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Button } from 'comp/button';
import { transformers } from 'compSystem/transformers';
import { Sh } from 'comp/sh';

import styles from './Example.scss';

type PropsExample = {
  code: string;
  children: ReactNode;
  description?: string;
};

export class Example extends ConnectedComponent<PropsExample> {
  localState = transformers.observable({
    codeOpen: false,
  });

  handleToggleCode = () => {
    transformers.batch(() => {
      this.localState.codeOpen = !this.localState.codeOpen;
    });
  };

  render() {
    const { children, code, description } = this.props;
    const { codeOpen } = this.localState;

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
            onClick={this.handleToggleCode}
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
}
