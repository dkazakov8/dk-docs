import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { getTypedKeys } from 'utils';

import styles from '../Submit.scss';

import { Form } from './Form';
import { TypeInputSubmitConfig } from './Submit';
import { TypeInputTextConfig } from './Text';

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

  const [result, setResult] = useState({ values: '' });

  return (
    <div>
      <Form
        formConfig={formConfig}
        onSubmit={() => {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          return new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            setResult({
              values: getTypedKeys(formConfig.inputs)
                .map((inputName) => `${inputName}: ${formConfig.inputs[inputName].value}`)
                .join(', '),
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

      {Boolean(result.values) && <div className={styles.result}>Result: {result.values}</div>}
    </div>
  );
}
