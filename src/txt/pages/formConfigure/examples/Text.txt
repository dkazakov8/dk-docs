import { TypeInputProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import cn from 'classnames';
import { useState } from 'react';

import { TypeFieldValidator } from 'models';
import { fieldValidators } from 'utils';

import { TypeForm } from './Form';
import styles from './Form.scss';

export type TypeInputTextConfig = {
  type: 'text';
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

export const Text = observer(function Text<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: TypeInputProps<TFormConfig, TypeInputTextConfig>
) {
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
    <div
      className={cn({
        [styles.inputWrapper]: true,
        [styles.disabled]: inputConfig.disabled,
        [styles.focused]: inputConfig.isFocused,
        [styles.hasErrors]: inputConfig.errors!.length > 0,
      })}
    >
      {Boolean(inputConfig.label) && <label htmlFor={inputConfig.id}>{inputConfig.label!}</label>}

      <div className={styles.inputInner}>
        <input
          id={inputConfig.id}
          name={name as string}
          type={'text'}
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

      {inputConfig.errors!.length > 0 && (
        <div className={styles.errors}>
          {inputConfig.errors!.map((errorObject) => (
            <div className={styles.errorItem} key={errorObject.message}>
              {errorObject.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
