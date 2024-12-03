import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { TypeInputSubmitConfig, TypeInputTextConfig } from 'models';

import styles from '../FormSubmitComponent.scss';

import { Form } from './Form';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextConfig;
  };
  submit: TypeInputSubmitConfig;
}>({
  inputs: {
    textField: {
      type: 'text',
      value: '',
    },
  },
  submit: {
    type: 'submit',
    label: 'Отправить',
  },
});

export function ExampleSubmit() {
  const [formConfig] = useState(() => sampleForm.copy());

  const [result, setResult] = useState({
    inputName: '',
    inputValue: '',
  });

  return (
    <div>
      <Form
        formConfig={formConfig}
        onSubmit={() => {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          return new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            setResult({
              inputName: Object.keys(formConfig.inputs).join(''),
              inputValue: formConfig.inputs.textField.value,
            });
          });
        }}
      >
        {({ inputs, submit }) => (
          <div className={styles.form}>
            {inputs.textField}
            {submit}
          </div>
        )}
      </Form>
      {Boolean(result.inputName) && (
        <div className={styles.result}>
          Result of {result.inputName}: {result.inputValue}
        </div>
      )}
    </div>
  );
}
