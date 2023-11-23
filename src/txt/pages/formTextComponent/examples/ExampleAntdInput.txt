import { FormConfig } from 'dk-react-mobx-config-form';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputTextAntdConfig } from 'models';

import styles from '../FormTextComponent.scss';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextAntdConfig;
  };
}>({
  inputs: {
    textField: {
      type: 'textAntd',
      value: '',
      placeholder: 'Simple text field',
    },
  },
});

export class ExampleAntdInput extends ConnectedComponent {
  sampleForm = sampleForm.copy();

  render() {
    return (
      <Form formConfig={this.sampleForm} className={styles.form}>
        {({ inputs }) => inputs.textField}
      </Form>
    );
  }
}
