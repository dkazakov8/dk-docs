import { FormConfig } from 'dk-react-mobx-config-form';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputTextConfig } from 'models';

import styles from '../FormTextComponent.scss';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextConfig;
  };
}>({
  inputs: {
    textField: {
      type: 'text',
      value: '',
      placeholder: 'Simple text field',
    },
  },
});

export class ExampleRegularInput extends ConnectedComponent {
  sampleForm = sampleForm.copy();

  render() {
    return (
      <Form formConfig={this.sampleForm} className={styles.form}>
        {({ inputs }) => inputs.textField}
      </Form>
    );
  }
}
