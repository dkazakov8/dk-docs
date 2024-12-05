import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { fieldValidators } from 'utils';

import styles from '../TextInput.scss';

import { Form } from './Form';
import { TypeInputTextMantineConfig } from './TextMantine';

export const sampleForm = new FormConfig<{
  inputs: Record<
    | 'regular'
    | 'regularNoLabel'
    | 'regularWithDefault'
    | 'emptyRestricted'
    | 'disabled'
    | 'disabledWithValue',
    TypeInputTextMantineConfig
  >;
}>({
  inputs: {
    regular: {
      type: 'textMantine',
      value: '',
      label: 'Regular input',
      placeholder: 'Regular input',
    },
    regularNoLabel: {
      type: 'textMantine',
      value: '',
      placeholder: 'Regular (no label)',
    },
    regularWithDefault: {
      type: 'textMantine',
      value: 'default value',
      label: 'With default value',
      placeholder: 'With default value',
    },
    emptyRestricted: {
      type: 'textMantine',
      value: '',
      validators: { emptyString: fieldValidators.emptyString },
      label: 'Empty restricted (triggers on blur)',
      placeholder: 'Empty restricted (triggers on blur)',
    },
    disabled: {
      type: 'textMantine',
      value: '',
      label: 'Disabled (no value)',
      placeholder: 'Disabled (no value)',
      disabled: true,
    },
    disabledWithValue: {
      type: 'textMantine',
      value: 'default value',
      label: 'Disabled (with value)',
      placeholder: 'Disabled (with value)',
      disabled: true,
    },
  },
});

export function ExampleMantineAllCases() {
  const [formConfig] = useState(() => sampleForm.copy());

  return (
    <Form formConfig={formConfig} className={styles.form}>
      {({ inputs }) => <>{Object.values(inputs).map((input) => input)}</>}
    </Form>
  );
}
