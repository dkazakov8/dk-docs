import { TypeSubmitProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { runInAction } from 'mobx';
import { Button } from '@mantine/core';

import { TypeForm } from './Form';

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
      id={inputConfig.id}
      disabled={inputConfig.disabled}
      loading={formConfig.isSubmitting}
      onClick={onClick}
    >
      {inputConfig.label}
    </Button>
  );
});
