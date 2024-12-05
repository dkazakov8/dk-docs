import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { getTypedKeys } from 'utils';

import styles from '../Submit.scss';

import { FormComplex } from './FormComplex';
import { TypeInputSubmitConfig } from './Submit';
import { TypeInputTextConfig } from './Text';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextConfig;
    textField2: TypeInputTextConfig;
  };
  submit: TypeInputSubmitConfig;
}>({
  inputs: {
    textField: {
      type: 'text',
      value: '',
    },
    textField2: {
      type: 'text',
      value: '',
    },
  },
  submit: {
    type: 'submit',
    label: 'Отправить',
  },
});

export function ExampleSubmitComplex() {
  const [formConfig] = useState(() => sampleForm.copy());

  const [result, setResult] = useState({ values: '' });

  return (
    <div>
      <FormComplex
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
            {inputs.textField2}
            {submit}
          </div>
        )}
      </FormComplex>

      {Boolean(result.values) && <div className={styles.result}>Result: {result.values}</div>}
    </div>
  );
}
