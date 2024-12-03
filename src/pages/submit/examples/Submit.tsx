import { TypeSubmitProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { runInAction } from 'mobx';

import { Button } from 'comp/button';
import { TypeForm } from 'models';

export type TypeInputSubmitConfig = {
  type: 'submit';
  label: string;

  id?: string;
  disabled?: boolean;
};

export const Submit = observer(function Submit<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>
) {
  const { initialData, inputConfig, formConfig, onClick } = props;

  useState(() => {
    runInAction(() => {
      Object.assign(inputConfig, {
        id: initialData?.id || inputConfig.id,
        label: initialData?.label || inputConfig.label,
      });
    });
  });

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
});
