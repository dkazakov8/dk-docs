import { Sh } from 'comp/sh';
import { Example } from 'comp/example';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

import styles from './FormTextComponent.scss';
import { messages } from './messages';
import { ExampleRegularAllCases } from './examples/ExampleRegularAllCases';
import { ExampleAntdAllCases } from './examples/ExampleAntdAllCases';
import { ExampleMantineAllCases } from './examples/ExampleMantineAllCases';

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
export default function FormTextComponent() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Продвинутый инпут + Mantine + Antd</h1>

      <p>
        Создадим более продвинутый вариант Text компонента. В примере используются валидаторы и
        работа с initialData, это будет покрыто в отдельных секциях документации
      </p>

      <Sh
        code={[
          {
            fileName: 'Text.tsx',
            code: require('txt/pages/formTextComponent/examples/Text.txt'),
            language: 'tsx',
          },
        ]}
      />
      <Example code={require('txt/pages/formTextComponent/examples/ExampleRegularAllCases.txt')}>
        <ExampleRegularAllCases />
      </Example>

      <h2>Компонент Antd</h2>

      <p>
        Отличается только тем, что type: 'text' заменен на type: 'textAntd' , так как тип у каждого
        поля должен быть уникальным + заменой стандартного input на импортированный из библиотеки
      </p>

      <Sh
        code={[
          {
            fileName: 'TextAntd.tsx',
            code: require('txt/pages/formTextComponent/examples/TextAntd.txt'),
            language: 'tsx',
          },
        ]}
      />

      <Example code={require('txt/pages/formTextComponent/examples/ExampleAntdAllCases.txt')}>
        <ExampleAntdAllCases />
      </Example>

      <h2>Компонент Mantine</h2>

      <p>
        Отличается тем, что type: 'text' заменен на type: 'textMantine' , так как тип у каждого поля
        должен быть уникальным + заменой стандартного input на импортированный из библиотеки. Также
        у Mantine свой вывод ошибок и label, поэтому код выглядит проще
      </p>

      <Sh
        code={[
          {
            fileName: 'TextMantine.tsx',
            code: require('txt/pages/formTextComponent/examples/TextMantine.txt'),
            language: 'tsx',
          },
        ]}
      />

      <Example code={require('txt/pages/formTextComponent/examples/ExampleMantineAllCases.txt')}>
        <ExampleMantineAllCases />
      </Example>

      <h2>Изменения в Form при добавлении новых компонентов</h2>

      <p>
        В TypeForm и componentsMapper добавились новые типы инпутов - это единственное, что нужно
        делать вручную при добавлении новых типов инпутов.
      </p>

      <Sh
        code={[
          {
            fileName: 'Form.tsx',
            code: require('txt/pages/formTextComponent/examples/Form.txt'),
            language: 'tsx',
          },
        ]}
        noExpand
      />
    </div>
  );
}
