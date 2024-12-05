import { Example } from 'comp/example';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

import styles from './FormConfigure.scss';
import { messages } from './messages';
import { ExampleDefault } from './examples/ExampleDefault';

class VM implements ViewModel {
  constructor(public context: TypeGlobals) {
    classToObservableAuto(__filename, this);
  }

  beforeMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title });
  }
}

// eslint-disable-next-line import/no-default-export
export default function FormConfigure() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Использование и расширение возможностей конфига</h1>
      <Example code={require('txt/pages/formConfigure/examples/ExampleDefault.txt')}>
        <ExampleDefault />
      </Example>
    </div>
  );
}
