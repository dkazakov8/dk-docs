import { TypeInputProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { useState } from 'react';
import { TextInput } from '@mantine/core';

import { TypeFieldValidator } from 'models';
import { fieldValidators } from 'utils';

import { TypeForm } from './Form';
import styles from './Form.scss';

export type TypeInputTextMantineConfig = {
  type: 'textMantine';
  value: string;

  id?: string;
  label?: string;
  errors?: Array<TypeFieldValidator>;
  disabled?: boolean;
  isFocused?: boolean;
  isValidFn?: (checkOnly?: boolean) => boolean;
  validators?: Partial<Record<keyof typeof fieldValidators, TypeFieldValidator>>;
  placeholder?: string;
};

export const TextMantine = observer(function TextMantine<
  TFormConfig extends TypeForm['TypeFormConfig'],
>(props: TypeInputProps<TFormConfig, TypeInputTextMantineConfig>) {
  const { name, inputConfig, initialData } = props;

  function isValidFn(checkOnly?: boolean) {
    if (inputConfig.disabled) return true;

    const newErrors = Object.values(inputConfig.validators!).filter(({ notValidCheck }) =>
      notValidCheck({ value: inputConfig.value })
    );

    if (!checkOnly) {
      runInAction(() => {
        inputConfig.errors = newErrors;
      });
    }

    return newErrors.length === 0;
  }

  useState(() => {
    runInAction(() => {
      Object.assign(inputConfig, {
        id: initialData?.id || inputConfig.id || `Input_${name as string}_${inputConfig.type}`,
        value: initialData?.value || inputConfig.value,
        errors: inputConfig.errors || [],
        disabled: initialData?.disabled || inputConfig.disabled,
        isFocused: false,
        isValidFn,
        validators: inputConfig.validators || {},
      });
    });
  });

  return (
    <div className={styles.inputWrapper}>
      <TextInput
        styles={{ root: { width: '100%' } }}
        id={inputConfig.id}
        label={inputConfig.label || undefined}
        name={name as string}
        type={'text'}
        error={
          inputConfig.errors!.length > 0
            ? inputConfig.errors!.map((errorObject) => errorObject.message).join(', ')
            : undefined
        }
        value={inputConfig.value}
        disabled={inputConfig.disabled}
        placeholder={inputConfig.placeholder}
        onBlur={() => {
          runInAction(() => {
            inputConfig.isFocused = false;
            isValidFn();
          });
        }}
        onFocus={() => {
          runInAction(() => {
            inputConfig.isFocused = true;
            inputConfig.errors = [];
          });
        }}
        onChange={(event) => {
          runInAction(() => {
            inputConfig.value = event.target.value || '';
          });
        }}
      />
    </div>
  );
});
