import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Sh } from 'comp/sh';
import { Example } from 'comp/example';

import styles from './FormTextComponent.scss';
import { messages } from './messages';
import { ExampleRegularInput } from './examples/ExampleRegularInput';
import { ExampleRegularAllCases } from './examples/ExampleRegularAllCases';
import { ExampleAntdInput } from './examples/ExampleAntdInput';
import { ExampleAntdAllCases } from './examples/ExampleAntdAllCases';

// eslint-disable-next-line import/no-default-export
export default class FormTextComponent extends ConnectedComponent {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Создание компонентов полей</h1>
        <p>
          Данный подход не ограничивает реализацию инпутов, можно использовать любую библиотеку,
          либо писать свои собственные компоненты. В примерах будут приведены вариант интеграции
          Antd со стилизацией через CSS Modules в классовом виде.
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
      </div>
    );
  }
}
