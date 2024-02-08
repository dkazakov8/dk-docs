import { MantineProvider } from '@mantine/core';

import { Router } from 'compSystem/Router';
import { Confirm } from 'comp/confirm';
import { Notifications } from 'comp/notifications';
import { Sidebar } from 'comp/sidebar';
import { Header } from 'comp/header';

import styles from './App.scss';

export function App() {
  return (
    <MantineProvider>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <Router />
      </div>
      <Confirm />
      <Notifications />
    </MantineProvider>
  );
}
