import { Sh } from 'comp/sh';
import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';
import { Example } from 'comp/example';

import styles from './FormGettingStarted.scss';
import { messages } from './messages';
import { ExampleBasic } from './examples/ExampleBasic';

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
export default function FormGettingStarted() {
  useStore(VM);

  return (
    <div className={styles.wrapper}>
      <h1>Начало работы</h1>
      <p>
        Данный компонент для форм - скорее паттерн для проектирования форм в связке React+MobX, чем
        полноценная библиотека. Она не содержит большого количества функционала и позволяет
        максимально гибко управлять компонентами исходя из логики приложения.
      </p>

      <p>
        Весь функционал инпутов (валидация, состояния, режими и т.п.) остается на усмотрение
        разрботчика, но в данной документации будет рассмотрена интеграция различных библиотек
        компонентов и валидаций.
      </p>

      <h2>Установка</h2>
      <Sh
        noExpand
        code={[
          {
            fileName: 'npm',
            code: `npm i dk-react-mobx-config-form lodash`,
            language: 'bash',
          },
        ]}
      />

      <h2>Базовый пример</h2>
      <p>
        1. Нужно создать компонент инпута с типами TypeInputTextConfig, которые будут ожидаться в
        объекте конфига формы, и попадут в props.inputConfig .
      </p>

      <Sh
        noExpand
        code={[
          {
            fileName: 'Text.tsx',
            code: require('txt/pages/formGettingStarted/examples/Text.txt'),
            language: 'tsx',
          },
        ]}
      />
      <p>
        2. Нужно создать компонент формы, в который передать componentsMapper - чтобы форма
        понимала, какой компонент инпута выводить. Также нужен TypeForm для корректной типизации
      </p>

      <Sh
        noExpand
        code={[
          {
            fileName: 'Form.tsx',
            code: require('txt/pages/formGettingStarted/examples/Form.txt'),
            language: 'tsx',
          },
        ]}
      />

      <p>3. Осталось создать FormConfig и вывести форму</p>

      <Example
        code={require('txt/pages/formGettingStarted/examples/ExampleBasic.txt')}
        description={'Базовый вывод'}
      >
        <ExampleBasic />
      </Example>

      <p>
        Создание TS-типов может выглядеть перегруженным, но это разовая операция, и типы (TypeForm и
        componentsMapper) нужно будет расширять только при добавлении новых инпутов.
      </p>
      {/*
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
          </p>*/}
    </div>
  );
}
