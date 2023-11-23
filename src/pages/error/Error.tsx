import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { errorCodes } from 'const';

import styles from './Error.scss';
import { messages } from './messages';

export type PropsErrorPage = {
  errorNumber: typeof errorCodes.INTERNAL_ERROR | typeof errorCodes.NOT_FOUND;
};

export class Error extends ConnectedComponent<PropsErrorPage> {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({
      title: messages.metaTitle,
    });
  }

  render() {
    const { getLn } = this.context;
    const { errorNumber } = this.props;

    if (errorNumber === errorCodes.NOT_FOUND) {
      return (
        <div className={styles.content}>
          <div className={styles.title}>{getLn(messages.error404Title)}</div>
          <div className={styles.subtitle}>{getLn(messages.error404Subtitle)}</div>
        </div>
      );
    }

    return (
      <div className={styles.content}>
        <div className={styles.title}>{getLn(messages.error500Title)}</div>
        <div className={styles.subtitle}>{getLn(messages.error500Subtitle)}</div>
      </div>
    );
  }
}
