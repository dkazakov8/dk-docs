import { ChangeEvent } from 'react';
import { TypeInputProps } from 'dk-react-mobx-config-form';
import { TextInput } from '@mantine/core';

import { TypeForm, TypeGlobals, TypeInputTextMantineConfig } from 'models';
import { useStore, ViewModel } from 'hooks/useStore';
import { classToObservableAuto } from 'compSystem/transformers';

import styles from '../Form.scss';

class VM<TFormConfig extends TypeForm['TypeFormConfig']> implements ViewModel {
  constructor(
    public context: TypeGlobals,
    public props: TypeInputProps<TFormConfig, TypeInputTextMantineConfig>
  ) {
    classToObservableAuto(__filename, this);
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

  isValidFn = (checkOnly?: boolean) => {
    const { inputConfig } = this.props;

    if (inputConfig.disabled) return true;

    const errors = Object.values(inputConfig.validators!).filter(({ notValidCheck }) =>
      notValidCheck({ value: inputConfig.value })
    );

    if (!checkOnly) Object.assign(inputConfig, { errors });

    return errors.length === 0;
  };

  handleBlur = () => {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { isFocused: false });

    this.isValidFn();
  };

  handleFocus = () => {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { isFocused: true, errors: [] });
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { inputConfig } = this.props;

    Object.assign(inputConfig, { value: event.target.value || '' });
  };
}

export function TextMantine<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: TypeInputProps<TFormConfig, TypeInputTextMantineConfig>
) {
  const { vm } = useStore(VM<TFormConfig>, props);

  const { name, inputConfig } = props;

  return (
    <div className={styles.inputWrapper}>
      <TextInput
        styles={{ root: { width: '100%' } }}
        id={inputConfig.id}
        label={inputConfig.label || undefined}
        name={name}
        type={'text'}
        error={
          inputConfig.errors!.length > 0
            ? inputConfig.errors!.map((errorObject) => errorObject.message).join(', ')
            : undefined
        }
        value={inputConfig.value}
        disabled={inputConfig.disabled}
        placeholder={inputConfig.placeholder}
        onBlur={vm.handleBlur}
        onFocus={vm.handleFocus}
        onChange={vm.handleChange}
      />
    </div>
  );
}
