import { FormConfig } from 'dk-react-mobx-config-form';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputTextConfig } from 'models';
import { fieldValidators } from 'utils';

import styles from '../FormTextComponent.scss';

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

export class ExampleRegularAllCases extends ConnectedComponent {
  sampleForm = sampleForm.copy();

  render() {
    return (
      <Form formConfig={this.sampleForm} className={styles.form}>
        {({ inputs }) => <>{Object.values(inputs).map((input) => input)}</>}
      </Form>
    );
  }
}
