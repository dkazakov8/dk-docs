import { ChangeEvent } from 'react';
import { TypeInputProps } from 'dk-react-mobx-config-form';
import { values } from 'lodash';
import { action, makeObservable } from 'mobx';
import { TextInput } from '@mantine/core';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeForm, TypeInputTextMantineConfig } from 'models';

import styles from '../Form.scss';

export class TextMantine<TFormConfig extends TypeForm['TypeFormConfig']> extends ConnectedComponent<
  TypeInputProps<TFormConfig, TypeInputTextMantineConfig>
> {
  constructor(props: any) {
    super(props);

    makeObservable(this, {
      UNSAFE_componentWillMount: action,
      isValidFn: action,
      handleBlur: action,
      handleFocus: action,
      handleChange: action,
    });
  }

  UNSAFE_componentWillMount() {
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

    const errors = values(inputConfig.validators).filter(({ notValidCheck }) =>
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

  render() {
    const { name, inputConfig } = this.props;

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
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
