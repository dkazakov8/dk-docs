import { Example } from 'comp/example';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { transformers } from 'compSystem/transformers';

import styles from './FormConfigure.scss';
import { messages } from './messages';
import { ExampleDefault } from './examples/ExampleDefault';

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals) {
    transformers.classToObservable(this, { context: false }, { autoBind: true });
  }

  beforeMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title });
  }
}

// eslint-disable-next-line import/no-default-export
export default transformers.observer(function FormConfigure() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Использование и расширение возможностей конфига</h1>
      <Example
        code={require('txt/pages/formConfigure/examples/ExampleDefault.txt')}
        description={'Дефолтные возможности формы'}
      >
        <ExampleDefault />
      </Example>
    </div>
  );
});
