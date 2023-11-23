import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Button } from 'comp/button';

import styles from './Header.scss';
import { messages } from './messages';
import { UserDropdown } from './UserDropdown';

export class Header extends ConnectedComponent {
  render() {
    const { getLn } = this.context;

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>{getLn(messages.logo)}</div>
          <div className={styles.headerRight}>
            <Button type={'white'} iconOnly={'darkMode'} />
            <UserDropdown userName={getLn(messages.settings)} />
          </div>
        </div>
      </div>
    );
  }
}
