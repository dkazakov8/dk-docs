import { errorCodes } from 'const';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

import { messages } from './messages';
import styles from './Error.scss';

export type PropsErrorPage = {
  errorNumber: typeof errorCodes.INTERNAL_ERROR | typeof errorCodes.NOT_FOUND;
};

class VM implements ViewModel {
  constructor(
    public context: TypeGlobals,
    public props: PropsErrorPage
  ) {
    classToObservableAuto(__filename, this);
  }

  beforeMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.metaTitle });
  }
}

export function Error(props: PropsErrorPage) {
  const { context } = useStore(VM, props);

  const { getLn } = context;
  const { errorNumber } = props;

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
