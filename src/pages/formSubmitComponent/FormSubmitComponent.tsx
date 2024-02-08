import { Sh } from 'comp/sh';
import { Example } from 'comp/example';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { transformers } from 'compSystem/transformers';

import styles from './FormSubmitComponent.scss';
import { messages } from './messages';
import { ExampleSubmit } from './examples/ExampleSubmit';

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
export default function FormSubmitComponent() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Создание компонента submit</h1>
      <p>
        Этот компонент не обязателен, так как доступ к значениям формы можно получить из-вне. Однако
        с этим компонентом проще делать простые формы (т.к. нажатие на Enter автоматически вызовет
        нажатие на эту кнопку)
      </p>

      <Sh
        code={[
          {
            fileName: 'models/TypeInputSubmitConfig.ts',
            code: require('txt/models/form/TypeInputSubmitConfig.txt'),
            language: 'tsx',
          },
          {
            fileName: 'comp/form/inputs/Submit.tsx',
            code: require('txt/comp/form/inputs/Submit.txt'),
            language: 'tsx',
          },
        ]}
      />
      <Example
        code={require('txt/pages/formSubmitComponent/examples/ExampleSubmit.txt')}
        description={'Вывод результата под форму.'}
      >
        <ExampleSubmit />
      </Example>
    </div>
  );
}
