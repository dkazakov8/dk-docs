import { ChangeEvent } from 'react';
import { TypeInputProps } from 'dk-react-mobx-config-form';
import { values } from 'lodash';
import { Input } from 'antd';

import { TypeForm, TypeGlobals, TypeInputTextAntdConfig } from 'models';
import { AbsViewModel, useStore } from 'hooks/useStore';
import { transformers } from 'compSystem/transformers';

import styles from '../Form.scss';

class VM<TFormConfig extends TypeForm['TypeFormConfig']> implements AbsViewModel {
  constructor(
    public context: TypeGlobals,
    public props: TypeInputProps<TFormConfig, TypeInputTextAntdConfig>
  ) {
    transformers.classToObservable(this, { context: false, props: false }, { autoBind: true });
  }

  beforeMount() {
    const { inputConfig, name, initialData } = this.props;

    Object.assign(inputConfig, {
      id: initialData?.id || inputConfig.id || `Input_${name}`,
      value: initialData?.value || inputConfig.value,
      errors: inputConfig.errors || [],
      disabled: initialData?.disabled || inputConfig.disabled,
      isFocused: false,
      isValidFn: this.isValidFn,
      validators: inputConfig.validators || {},
    });
  }

  isValidFn(checkOnly?: boolean) {
    const { inputConfig } = this.props;

    if (inputConfig.disabled) return true;

    const errors = values(inputConfig.validators).filter(({ notValidCheck }) =>
      notValidCheck({ value: inputConfig.value })
    );

    if (!checkOnly) Object.assign(inputConfig, { errors });

    return errors.length === 0;
  }

  handleBlur() {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { isFocused: false });

    this.isValidFn();
  }

  handleFocus() {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { isFocused: true, errors: [] });
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { value: event.target.value || '' });
  }
}

export const TextAntd = transformers.observer(function TextAntd<
  TFormConfig extends TypeForm['TypeFormConfig']
>(props: TypeInputProps<TFormConfig, TypeInputTextAntdConfig>) {
  const { vm } = useStore(VM, props);

  const { name, inputConfig } = props;

  return (
    <div className={styles.inputWrapper}>
      {Boolean(inputConfig.label) && <label htmlFor={inputConfig.id}>{inputConfig.label!}</label>}
      <Input
        id={inputConfig.id}
        name={name}
        type={'text'}
        value={inputConfig.value}
        disabled={inputConfig.disabled}
        placeholder={inputConfig.placeholder}
        onBlur={vm.handleBlur}
        onFocus={vm.handleFocus}
        onChange={vm.handleChange}
        bordered
        size={'large'}
        status={inputConfig.errors!.length > 0 ? 'error' : undefined}
      />
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
