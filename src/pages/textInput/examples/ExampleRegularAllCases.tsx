import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { fieldValidators } from 'utils';

import styles from '../FormTextComponent.scss';

import { TypeInputTextConfig } from './Text';
import { Form } from './Form';

export const sampleForm = new FormConfig<{
  inputs: Record<
    | 'regular'
    | 'regularNoLabel'
    | 'regularWithDefault'
    | 'emptyRestricted'
    | 'disabled'
    | 'disabledWithValue',
    TypeInputTextConfig
  >;
}>({
  inputs: {
    regular: {
      type: 'text',
      value: '',
      label: 'Regular input',
      placeholder: 'Regular input',
    },
    regularNoLabel: {
      type: 'text',
      value: '',
      placeholder: 'Regular (no label)',
    },
    regularWithDefault: {
      type: 'text',
      value: 'default value',
      label: 'With default value',
      placeholder: 'With default value',
    },
    emptyRestricted: {
      type: 'text',
      value: '',
      validators: { emptyString: fieldValidators.emptyString },
      label: 'Empty restricted (triggers on blur)',
      placeholder: 'Empty restricted (triggers on blur)',
    },
    disabled: {
      type: 'text',
      value: '',
      label: 'Disabled (no value)',
      placeholder: 'Disabled (no value)',
      disabled: true,
    },
    disabledWithValue: {
      type: 'text',
      value: 'default value',
      label: 'Disabled (with value)',
      placeholder: 'Disabled (with value)',
      disabled: true,
    },
  },
});

export function ExampleRegularAllCases() {
  const [formConfig] = useState(() => sampleForm.copy());

  return (
    <Form formConfig={formConfig} className={styles.form}>
      {({ inputs }) => <>{Object.values(inputs).map((input) => input)}</>}
    </Form>
  );
}
