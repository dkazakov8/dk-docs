import { FormConfig, TypeFormSubmit } from 'dk-react-mobx-config-form';
import { observable, runInAction } from 'mobx';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Form } from 'comp/form';
import { TypeInputSubmitConfig, TypeInputTextConfig } from 'models';

import styles from '../FormSubmitComponent.scss';

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
      placeholder: 'Simple text field',
    },
  },
  submit: {
    type: 'submit',
    label: 'Submit',
  },
});

export class ExampleSubmit extends ConnectedComponent {
  sampleForm = sampleForm.copy();
  sampleForm2 = sampleForm.copy();

  result = observable({
    inputName: '',
    inputValue: '',
  });
  result2 = observable({
    inputName: '',
    inputValue: '',
  });

  handleSubmit: TypeFormSubmit<typeof sampleForm> = (formConfig) => {
    runInAction(() => {
      this.result.inputName = Object.keys(formConfig.inputs).join('');
      this.result.inputValue = formConfig.inputs.textField.value;
    });

    return Promise.resolve();
  };

  handleSubmitNoArgs = () => {
    runInAction(() => {
      this.result2.inputName = Object.keys(this.sampleForm2.inputs).join('');
      this.result2.inputValue = this.sampleForm2.inputs.textField.value;
    });

    return Promise.resolve();
  };

  render() {
    return (
      <div>
        <Form formConfig={this.sampleForm} onSubmit={this.handleSubmit}>
          {({ inputs, submit }) => (
            <div className={styles.form}>
              {inputs.textField}
              {submit}
            </div>
          )}
        </Form>
        {Boolean(this.result.inputName) && (
          <div className={styles.result}>
            Result of {this.result.inputName}: {this.result.inputValue}
          </div>
        )}

        <Form formConfig={this.sampleForm2} onSubmit={this.handleSubmitNoArgs}>
          {({ inputs, submit }) => (
            <div className={styles.form}>
              {inputs.textField}
              {submit}
            </div>
          )}
        </Form>
        {Boolean(this.result2.inputName) && (
          <div className={styles.result}>
            Result of {this.result2.inputName}: {this.result2.inputValue}
          </div>
        )}
      </div>
    );
  }
}
