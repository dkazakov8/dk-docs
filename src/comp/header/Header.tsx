import styles from './Header.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>dk-react-mobx-config-form</div>
      </div>
    </div>
  );
}
