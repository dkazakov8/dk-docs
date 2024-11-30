import { FormConfig } from 'dk-react-mobx-config-form';

import { Form } from 'comp/form';
import { TypeGlobals, TypeInputTextAntdConfig } from 'models';
import { useStore, ViewModel } from 'hooks/useStore';
import { classToObservableAuto } from 'compSystem/transformers';

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

class VM implements ViewModel {
  constructor(public context: TypeGlobals) {
    classToObservableAuto(__filename, this);
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
