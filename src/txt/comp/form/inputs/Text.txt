import cn from 'classnames';
import { ChangeEvent } from 'react';
import { TypeInputProps } from 'dk-react-mobx-config-form';
import { values } from 'lodash';
import { action, makeObservable } from 'mobx';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeForm, TypeInputTextConfig } from 'models';

import styles from '../Form.scss';

export class Text<TFormConfig extends TypeForm['TypeFormConfig']> extends ConnectedComponent<
  TypeInputProps<TFormConfig, TypeInputTextConfig>
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
            name={name}
            type={'text'}
            value={inputConfig.value}
            disabled={inputConfig.disabled}
            placeholder={inputConfig.placeholder}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
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
  }
}
