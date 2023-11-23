import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Sh } from 'comp/sh';

import { messages } from './messages';
import styles from './FormGettingStarted.scss';

// eslint-disable-next-line import/no-default-export
export default class FormGettingStarted extends ConnectedComponent {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Начало работы</h1>
        <p>
          Компонент для форм - скорее паттерн для проектирования форм в связке React+MobX, чем
          полноценная библиотека. Она не содержит большого количества функционала и позволяет
          максимально гибко управлять компонентами исходя из логики приложения.
        </p>

        <h2>Установка</h2>
        <Sh
          noExpand
          code={[
            {
              fileName: 'npm',
              code: `npm i dk-react-mobx-config-form lodash mobx react`,
              language: 'bash',
            },
          ]}
        />

        <h2>Настройка TypeScript</h2>
        <p>Необходимо создать несколько файлов.</p>
        <Sh
          code={[
            {
              fileName: 'models/TypeFieldValidator.ts',
              code: require('txt/models/form/TypeFieldValidator.txt'),
              language: 'tsx',
            },
            {
              fileName: 'models/TypeInputTextConfig.ts',
              code: require('txt/models/form/TypeInputTextConfig.txt'),
              language: 'tsx',
            },
            {
              fileName: 'models/TypeInputSubmitConfig.ts',
              code: require('txt/models/form/TypeInputSubmitConfig.txt'),
              language: 'tsx',
            },
            {
              fileName: 'models/TypeAnyInput.ts',
              code: require('txt/models/form/TypeAnyInput.txt'),
              language: 'tsx',
            },
            {
              fileName: 'models/TypeFormConfig.ts ',
              code: require('txt/models/form/TypeFormConfig.txt'),
              language: 'tsx',
            },
          ]}
        />

        <h2>Настройка валидаторов</h2>
        <p>
          Так как на предыдущем этапе была создана типизация для валидаторов, необходимо их создать.
        </p>
        <Sh
          code={[
            {
              fileName: 'utils/fieldValidators.ts',
              code: require('txt/utils/form/fieldValidators.txt'),
              language: 'tsx',
            },
          ]}
        />

        <h2>Настройка компонента формы</h2>
        <Sh
          code={[
            {
              fileName: 'comp/form/Form.tsx',
              code: require('txt/comp/form/Form.txt'),
              language: 'tsx',
            },
          ]}
        />
        <p>
          В данном примере onError описывается непосредственно в компоненте, чтобы формы одинаково
          обрабатывали ошибки. Однако сохраняется возможность передавать кастомные обработчики через
          props.
        </p>
      </div>
    );
  }
}
