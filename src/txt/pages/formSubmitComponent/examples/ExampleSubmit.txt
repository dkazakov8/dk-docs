import { FormConfig } from 'dk-react-mobx-config-form';

import { Form } from 'comp/form';
import { TypeGlobals, TypeInputSubmitConfig, TypeInputTextConfig } from 'models';
import { useStore, ViewModel } from 'hooks/useStore';
import { classToObservableAuto } from 'compSystem/transformers';

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

class VM implements ViewModel {
  constructor(public context: TypeGlobals) {
    classToObservableAuto(__filename, this);
  }

  sampleForm = sampleForm.copy();

  result = {
    inputName: '',
    inputValue: '',
  };

  handleSubmit() {
    this.result.inputName = Object.keys(this.sampleForm.inputs).join('');
    this.result.inputValue = this.sampleForm.inputs.textField.value;

    return Promise.resolve();
  }
}

export function ExampleSubmit() {
  const { vm } = useStore(VM);

  return (
    <div>
      <Form formConfig={vm.sampleForm} onSubmit={vm.handleSubmit}>
        {({ inputs, submit }) => (
          <div className={styles.form}>
            {inputs.textField}
            {submit}
          </div>
        )}
      </Form>
      {Boolean(vm.result.inputName) && (
        <div className={styles.result}>
          Result of {vm.result.inputName}: {vm.result.inputValue}
        </div>
      )}
    </div>
  );
}
