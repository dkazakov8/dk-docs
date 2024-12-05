import { Sh } from 'comp/sh';
import { Example } from 'comp/example';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';
import { ExampleSubmitComplex } from 'pages/submit/examples/ExampleSubmitComplex';

import styles from './Submit.scss';
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
export default function Submit() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Компонент Submit и отправка формы</h1>

      <p>
        Этот компонент не обязателен, но определив его будет удобнее писать универсальную логику
        (например делать disabled состояние у кнопки, если поля пустые).
      </p>

      <p>
        Детали реализации, как обычно, зависят от разработчика. Если используется input
        type="submit", то props.onClick использовать не нужно, но на случай если этот компонент
        например div элемент, то это проп нужен - он вызовет отправку формы по клику.
      </p>

      <p>
        formConfig.isSubmitting - системное boolean поле конфига, которое отражает состояние
        процесса отправки формы.
      </p>

      <Sh
        code={[
          {
            fileName: 'Submit.tsx',
            code: require('txt/pages/submit/examples/Submit.txt'),
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
            code: require('txt/pages/submit/examples/Form.txt'),
            language: 'tsx',
          },
        ]}
      />

      <Example code={require('txt/pages/submit/examples/ExampleSubmit.txt')}>
        <ExampleSubmit />
      </Example>

      <p>
        Так как каждый компонент, включая Submit и инпуты, получает props.formConfig, содержащий всю
        информацию обо всех инпутах. То определенную универсальную логику можно вынести
        непосредственно в Submit. Например, проставить disabled для кнопки, если поля пустые либо
        если значения в них некорректные (вызвав валидаторы в "тихом" режиме).
      </p>

      <Sh
        code={[
          {
            fileName: 'SubmitComplex.tsx',
            code: require('txt/pages/submit/examples/SubmitComplexDoc.txt'),
            language: 'tsx',
          },
        ]}
        noExpand
      />

      <Example code={require('txt/pages/submit/examples/ExampleSubmitComplex.txt')}>
        <ExampleSubmitComplex />
      </Example>
    </div>
  );
}
