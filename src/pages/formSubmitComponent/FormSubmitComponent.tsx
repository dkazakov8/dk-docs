import { Sh } from 'comp/sh';
import { Example } from 'comp/example';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

import styles from './FormSubmitComponent.scss';
import { messages } from './messages';
import { ExampleSubmit } from './examples/ExampleSubmit';

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
export default function FormSubmitComponent() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Компонент Submit и отправка формы</h1>

      <p>
        Этот компонент не обязателен, но с ним проще делать простые формы - нажатие на Enter
        автоматически вызовет отправку.
      </p>

      <p>
        Детали реализации, как обычно, зависят от разработчика. В данном случае используется input
        type="submit", поэтому props.onClick использовать не нужно, но на случай если этот компонент
        например div элемент, то это проп нужен - он вызовет отправку формы по клику.
      </p>

      <p>
        formConfig.isSubmitting - системное поле конфига, о котором подробнее будет рассказываться
        дальше в этой документации.
      </p>

      <Sh
        code={[
          {
            fileName: 'Submit.tsx',
            code: require('txt/pages/formSubmitComponent/examples/Submit.txt'),
            language: 'tsx',
          },
        ]}
        noExpand
      />

      <p>
        Этот компонент, как и другие инпуты, нужно зарегистрировать в TypeForm (на этот раз во
        втором аргументе) и в componentsMapper
      </p>

      <Sh
        code={[
          {
            fileName: 'Form.tsx',
            code: require('txt/pages/formSubmitComponent/examples/Form.txt'),
            language: 'tsx',
          },
        ]}
        noExpand
      />

      <Example code={require('txt/pages/formSubmitComponent/examples/ExampleSubmit.txt')}>
        <ExampleSubmit />
      </Example>
    </div>
  );
}
