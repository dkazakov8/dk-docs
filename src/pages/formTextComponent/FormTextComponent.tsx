import { Sh } from 'comp/sh';
import { Example } from 'comp/example';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';

import styles from './FormTextComponent.scss';
import { messages } from './messages';
import { ExampleRegularInput } from './examples/ExampleRegularInput';
import { ExampleRegularAllCases } from './examples/ExampleRegularAllCases';
import { ExampleAntdInput } from './examples/ExampleAntdInput';
import { ExampleAntdAllCases } from './examples/ExampleAntdAllCases';
import { ExampleMantineInput } from './examples/ExampleMantineInput';
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
      <h1>Создание компонентов полей</h1>
      <p>
        Данный подход не ограничивает реализацию инпутов, можно использовать любую библиотеку, либо
        писать свои собственные компоненты. В примерах будут приведены варианты интеграции Antd и
        Mantine в классовом виде.
      </p>

      <h2>Компонент без библиотек</h2>
      <Sh
        code={[
          {
            fileName: 'models/TypeInputTextConfig.ts',
            code: require('txt/models/form/TypeInputTextConfig.txt'),
            language: 'tsx',
          },
          {
            fileName: 'comp/form/inputs/Text.tsx',
            code: require('txt/comp/form/inputs/Text.txt'),
            language: 'tsx',
          },
        ]}
      />
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleRegularInput.txt')}
        description={'Базовый вывод единственного поля'}
      >
        <ExampleRegularInput />
      </Example>
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleRegularAllCases.txt')}
        description={'Разные виды'}
      >
        <ExampleRegularAllCases />
      </Example>

      <h2>Компонент Antd</h2>
      <Sh
        code={[
          {
            fileName: 'models/TypeInputTextAntdConfig.ts',
            code: require('txt/models/form/TypeInputTextAntdConfig.txt'),
            language: 'tsx',
          },
          {
            fileName: 'comp/form/inputs/TextAntd.tsx',
            code: require('txt/comp/form/inputs/TextAntd.txt'),
            language: 'tsx',
          },
        ]}
      />
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleAntdInput.txt')}
        description={'Базовый вывод единственного поля'}
      >
        <ExampleAntdInput />
      </Example>
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleAntdAllCases.txt')}
        description={'Разные виды'}
      >
        <ExampleAntdAllCases />
      </Example>

      <h2>Компонент Mantine</h2>
      <Sh
        code={[
          {
            fileName: 'models/TypeInputTextMantineConfig.ts',
            code: require('txt/models/form/TypeInputTextMantineConfig.txt'),
            language: 'tsx',
          },
          {
            fileName: 'comp/form/inputs/TextMantine.tsx',
            code: require('txt/comp/form/inputs/TextMantine.txt'),
            language: 'tsx',
          },
        ]}
      />
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleMantineInput.txt')}
        description={'Базовый вывод единственного поля'}
      >
        <ExampleMantineInput />
      </Example>
      <Example
        code={require('txt/pages/formTextComponent/examples/ExampleMantineAllCases.txt')}
        description={'Разные виды'}
      >
        <ExampleMantineAllCases />
      </Example>
    </div>
  );
}
