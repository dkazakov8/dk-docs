import { useStore } from 'hooks/useStore';

import styles from './Header.scss';
import { messages } from './messages';

export function Header() {
  const { context } = useStore();

  const { getLn } = context;

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>{getLn(messages.logo)}</div>
      </div>
    </div>
  );
}
