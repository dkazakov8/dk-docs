import { Button } from 'comp/button';
import { transformers } from 'compSystem/transformers';
import { useStore } from 'hooks/useStore';

import styles from './Header.scss';
import { messages } from './messages';

export const Header = transformers.observer(function Header() {
  const { context } = useStore();

  const { getLn } = context;

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>{getLn(messages.logo)}</div>
        <div className={styles.headerRight}>
          <Button type={'white'} iconOnly={'darkMode'} />
          {/* <UserDropdown userName={getLn(messages.settings)} />*/}
        </div>
      </div>
    </div>
  );
});
