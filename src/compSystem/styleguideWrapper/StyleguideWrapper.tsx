import 'styles/global.scss';

import { isomorphPolyfills } from 'utils';
import { UserDropdown } from 'comp/header/UserDropdown';

import { createGlobals } from '../createGlobals';
import { ConnectedComponent } from '../ConnectedComponent';
import { StoreContext } from '../StoreContext';

import styles from './StyleguideWrapper.scss';

isomorphPolyfills();

const globals = createGlobals();

// eslint-disable-next-line import/no-default-export,import/no-unused-modules
export default class StyleguideWrapper extends ConnectedComponent {
  render() {
    return (
      <StoreContext.Provider value={globals}>
        <StyleguideWrapperInner>{this.props.children}</StyleguideWrapperInner>
      </StoreContext.Provider>
    );
  }
}

class StyleguideWrapperInner extends ConnectedComponent {
  UNSAFE_componentWillMount() {
    const { actions, store } = this.context;

    void actions.ui.setTheme({ theme: store.ui.currentTheme });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <UserDropdown userName={'Theme picker'} />
        {this.props.children}
      </div>
    );
  }
}
