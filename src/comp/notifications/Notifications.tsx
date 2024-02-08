import { generateArray } from 'utils';
import { system } from 'const';
import { Notification } from 'comp/notifications/Notification';
import { useStore } from 'hooks/useStore';

import styles from './Notifications.scss';

export function Notifications() {
  const { context } = useStore();

  const { store } = context;

  const wrapperStyle = {
    zIndex: system.NOTIFICATIONS_BASE_Z_INDEX,
  };

  return (
    <div className={styles.notifications} style={wrapperStyle}>
      {store.ui.notifications.map((notification, index) => {
        const prevElementsHeight = generateArray(index).reduce(
          (num, i) => num + (store.ui.notifications[i].height || 0),
          0
        );

        /**
         * Don't pass the whole notification observable, because it will
         * lead to lots of rerenders (Notification component will start
         * listening to changes, but it should not)
         *
         */

        return (
          <Notification
            id={notification.id}
            key={notification.id}
            type={notification.type}
            height={notification.height}
            status={notification.status}
            message={notification.message}
            prevElementsHeight={prevElementsHeight}
          />
        );
      })}
    </div>
  );
}
