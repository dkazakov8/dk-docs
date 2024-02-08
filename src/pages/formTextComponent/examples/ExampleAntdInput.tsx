import { FormConfig } from 'dk-react-mobx-config-form';

import { Form } from 'comp/form';
import { TypeGlobals, TypeInputTextAntdConfig } from 'models';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { transformers } from 'compSystem/transformers';

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

class VM implements AbsViewModel {
  constructor(public context: TypeGlobals) {
    transformers.classToObservable(this, { context: false }, { autoBind: true });
  }

  sampleForm = sampleForm.copy();
}

export function ExampleAntdInput() {
  const { vm } = useStore(VM);

  return (
    <Form formConfig={vm.sampleForm} className={styles.form}>
      {({ inputs }) => inputs.textField}
    </Form>
  );
}
