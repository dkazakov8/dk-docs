import { ActionIcon } from '@mantine/core';
import React from 'react';

import { Icon } from 'comp/icon';

import styles from './Header.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>dk-react-mobx-config-form</div>
        <a
          href={
            'https://github.com/dkazakov8/dk-framework/tree/master/packages/react-mobx-config-form'
          }
          target={'_blank'}
          className={styles.githubButton}
          rel={'noreferrer'}
        >
          <ActionIcon variant={'default'}>
            <Icon glyph={'github'} />
          </ActionIcon>
        </a>
      </div>
    </div>
  );
}
