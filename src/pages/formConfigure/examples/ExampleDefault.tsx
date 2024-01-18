import { FormConfig } from 'dk-react-mobx-config-form';

import { Form } from 'comp/form';
import { TypeGlobals, TypeInputTextConfig } from 'models';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { transformers } from 'compSystem/transformers';
import { fieldValidators } from 'utils';

import styles from '../FormConfigure.scss';

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
      validators: { emptyString: fieldValidators.emptyString },
    },
  },
});

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals) {
    transformers.classToObservable(this, { context: false }, { autoBind: true });
  }

  sampleForm = sampleForm.copy();
}

export const ExampleDefault = transformers.observer(function ExampleDefault() {
  const { vm } = useStore(VM);

  return (
    <div>
      <Form formConfig={vm.sampleForm}>
        {({ inputs }) => <div className={styles.result}>{inputs.textField}</div>}
      </Form>
      <div className={styles.result}>
        this.sampleForm.inputs: {JSON.stringify(vm.sampleForm.inputs)}
      </div>
      <div className={styles.result}>
        this.sampleForm.original: {JSON.stringify(vm.sampleForm.original)}
      </div>
    </div>
  );
});
