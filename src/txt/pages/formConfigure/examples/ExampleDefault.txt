import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { fieldValidators } from 'utils';

import styles from '../FormConfigure.scss';

import { Form } from './Form';
import { TypeInputTextConfig } from './Text';
import { TypeInputSubmitConfig } from './Submit';

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
      validators: { emptyString: fieldValidators.emptyString },
    },
  },
  submit: {
    type: 'submit',
    label: 'Отправить',
  },
});

export function ExampleDefault() {
  const [formConfig] = useState(() => sampleForm.copy());

  return (
    <div>
      <Form formConfig={formConfig}>
        {({ inputs, submit }) => (
          <div className={styles.result}>
            {inputs.textField}
            {submit}
          </div>
        )}
      </Form>
      <div className={styles.result}>
        this.sampleForm.inputs: {JSON.stringify(formConfig.inputs)}
      </div>
      <div className={styles.result}>
        this.sampleForm.original: {JSON.stringify(formConfig.original)}
      </div>
    </div>
  );
}
