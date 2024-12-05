import { TypeSubmitProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { autorun, runInAction } from 'mobx';
import { Button } from '@mantine/core';

import { TypeForm } from 'models';

export type TypeInputSubmitConfig = {
  type: 'submit';
  label: string;

  id?: string;
  disabled?: boolean;
};

export const SubmitComplex = observer(function SubmitComplex<
  TFormConfig extends TypeForm['TypeFormConfig'],
>(props: TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>) {
  const { initialData, inputConfig, formConfig, onClick } = props;

  useState(() => {
    runInAction(() => {
      Object.assign(inputConfig, {
        id: initialData?.id || inputConfig.id,
        label: initialData?.label || inputConfig.label,
      });
    });
  });

  useEffect(() => {
    const disposer = autorun(() => {
      const shouldBeDisabled = Object.values(formConfig.inputs).some(
        (inpConfig) => !inpConfig.value
      );

      runInAction(() => {
        inputConfig.disabled = shouldBeDisabled;
      });
    });

    return () => disposer();
  }, []);

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
