import { FormConfig } from 'dk-react-mobx-config-form';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputTextAntdConfig } from 'models';
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
    TypeInputTextAntdConfig
  >;
}>({
  inputs: {
    regular: {
      type: 'textAntd',
      value: '',
      label: 'Regular input',
      placeholder: 'Regular input',
    },
    regularNoLabel: {
      type: 'textAntd',
      value: '',
      placeholder: 'Regular (no label)',
    },
    regularWithDefault: {
      type: 'textAntd',
      value: 'default value',
      label: 'With default value',
      placeholder: 'With default value',
    },
    emptyRestricted: {
      type: 'textAntd',
      value: '',
      validators: { emptyString: fieldValidators.emptyString },
      label: 'Empty restricted (triggers on blur)',
      placeholder: 'Empty restricted (triggers on blur)',
    },
    disabled: {
      type: 'textAntd',
      value: '',
      label: 'Disabled (no value)',
      placeholder: 'Disabled (no value)',
      disabled: true,
    },
    disabledWithValue: {
      type: 'textAntd',
      value: 'default value',
      label: 'Disabled (with value)',
      placeholder: 'Disabled (with value)',
      disabled: true,
    },
  },
});

export class ExampleAntdAllCases extends ConnectedComponent {
  sampleForm = sampleForm.copy();

  render() {
    return (
      <Form formConfig={this.sampleForm} className={styles.form}>
        {({ inputs }) => <>{Object.values(inputs).map((input) => input)}</>}
      </Form>
    );
  }
}
