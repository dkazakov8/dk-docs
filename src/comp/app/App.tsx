import { MantineProvider } from '@mantine/core';

import { Modal } from 'comp/modal';
import { Router } from 'compSystem/Router';
import { Confirm } from 'comp/confirm';
import { Notifications } from 'comp/notifications';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Sidebar } from 'comp/sidebar';
import { Header } from 'comp/header';

import styles from './App.scss';

export class App extends ConnectedComponent {
  render() {
    return (
      <MantineProvider>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <Router />
        </div>
        <Modal />
        <Confirm />
        <Notifications />
      </MantineProvider>
    );
  }
}
