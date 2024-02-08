import { TypeSubmitProps } from 'dk-react-mobx-config-form';

import { Button } from 'comp/button';
import { TypeForm, TypeGlobals, TypeInputSubmitConfig } from 'models';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { transformers } from 'compSystem/transformers';

class VM<TFormConfig extends TypeForm['TypeFormConfig']> implements AbsViewModel {
  constructor(
    public context: TypeGlobals,
    public props: TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>
  ) {
    transformers.classToObservable(this, { context: false, props: false }, { autoBind: true });
  }

  beforeMount() {
    const { inputConfig, initialData } = this.props;

    const initialInputConfig = {
      id: initialData?.id || inputConfig.id,
      label: initialData?.label || inputConfig.label,
    };

    Object.assign(inputConfig, initialInputConfig);
  }
}

export function Submit<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>
) {
  useStore(VM, props);

  const { inputConfig, formConfig, onClick } = props;

  return (
    <Button
      type={'blue'}
      element={'submit'}
      onClick={onClick}
      id={inputConfig.id}
      disabled={inputConfig.disabled}
      isLoading={formConfig.isSubmitting}
    >
      {inputConfig.label}
    </Button>
  );
}
