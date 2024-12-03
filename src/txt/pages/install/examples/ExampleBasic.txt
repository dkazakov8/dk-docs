import { FormConfig } from 'dk-react-mobx-config-form';
import { useState } from 'react';

import { Form } from './Form';
import { TypeInputTextConfig } from './Text';

const sampleForm = new FormConfig<{
  inputs: {
    textField: TypeInputTextConfig;
  };
}>({
  inputs: {
    textField: {
      type: 'text',
      id: 'Input_Id',
      value: '',
      label: 'Label текстового поля',
    },
  },
});

export function ExampleBasic() {
  const [formConfig] = useState(() => sampleForm.copy());

  return <Form formConfig={formConfig}>{({ inputs }) => inputs.textField}</Form>;
}
