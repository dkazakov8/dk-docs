import { FormConfig } from 'dk-react-mobx-config-form';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputTextMantineConfig } from 'models';

import styles from '../FormTextComponent.scss';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextMantineConfig;
  };
}>({
  inputs: {
    textField: {
      type: 'textMantine',
      value: '',
      placeholder: 'Simple text field',
    },
  },
});

export class ExampleMantineInput extends ConnectedComponent {
  sampleForm = sampleForm.copy();

  render() {
    return (
      <Form formConfig={this.sampleForm} className={styles.form}>
        {({ inputs }) => inputs.textField}
      </Form>
    );
  }
}
