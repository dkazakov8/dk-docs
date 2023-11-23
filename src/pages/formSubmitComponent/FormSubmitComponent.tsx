import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Sh } from 'comp/sh';
import { Example } from 'comp/example';

import styles from './FormSubmitComponent.scss';
import { messages } from './messages';
import { ExampleSubmit } from './examples/ExampleSubmit';

// eslint-disable-next-line import/no-default-export
export default class FormSubmitComponent extends ConnectedComponent {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Создание компонента submit</h1>
        <p>
          Этот компонент не обязателен, так как доступ к значениям формы можно получить из-вне.
          Однако с этим компонентом проще делать простые формы (т.к. нажатие на Enter автоматически
          вызовет нажатие на эту кнопку)
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
          description={
            'Вывод результата под форму. Обработчик события onSubmit можно типизировать и использовать аргумент ' +
            'из функции для получения объекта формы как в примере handleSubmit, либо использовать без аргументов, ' +
            'как в примере handleSubmitNoArgs'
          }
        >
          <ExampleSubmit />
        </Example>
      </div>
    );
  }
}
