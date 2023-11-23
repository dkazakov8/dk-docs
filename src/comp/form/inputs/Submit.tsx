import { values } from 'lodash';
import { TypeSubmitProps } from 'dk-react-mobx-config-form';
import { action, makeObservable } from 'mobx';

import { Button } from 'comp/button';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { appendAutorun } from 'utils';
import { TypeAnyInput, TypeForm, TypeInputSubmitConfig } from 'models';

export class Submit<TFormConfig extends TypeForm['TypeFormConfig']> extends ConnectedComponent<
  TypeSubmitProps<TFormConfig, TypeInputSubmitConfig>
> {
  constructor(props: any) {
    super(props);

    makeObservable(this, {
      UNSAFE_componentWillMount: action,
      setDisabled: action,
    });
  }

  UNSAFE_componentWillMount() {
    const { inputConfig, initialData } = this.props;

    const initialInputConfig = {
      id: initialData?.id || inputConfig.id,
      label: initialData?.label || inputConfig.label,
      buttonProps: initialData?.buttonProps || inputConfig.buttonProps,
    };

    Object.assign(inputConfig, initialInputConfig);
  }

  componentDidMount() {
    appendAutorun(this, this.setDisabled);
  }

  setDisabled = () => {
    const { formConfig, inputConfig } = this.props;

    inputConfig.disabled = values(formConfig.inputs).some((config: TypeAnyInput) => {
      if (config.validators?.emptyString) {
        return !config.isValidFn?.(true);
      }

      return false;
    });
  };

  render() {
    const { inputConfig, formConfig, onClick } = this.props;

    return (
      <Button
        {...inputConfig.buttonProps}
        type={inputConfig.buttonProps?.type || 'blue'}
        element={'submit'}
        onClick={onClick}
        id={inputConfig.id}
        disabled={inputConfig.disabled}
        isLoading={inputConfig.buttonProps?.isLoading || formConfig.isSubmitting}
      >
        {inputConfig.label}
      </Button>
    );
  }
}
