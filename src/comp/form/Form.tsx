import { ReactMobxForm, PropsReactMobxForm } from 'dk-react-mobx-config-form';
import { Component } from 'react';

import { TypeForm, TypeAnyInput, TypeInputSubmitConfig } from 'models';

import { Text } from './inputs/Text';
import { TextAntd } from './inputs/TextAntd';
import { Submit } from './inputs/Submit';

export const componentsMapper: Record<TypeAnyInput['type'], typeof Text | typeof TextAntd> &
  Record<TypeInputSubmitConfig['type'], typeof Submit> = {
  submit: Submit,
  text: Text,
  textAntd: TextAntd,
};

export class Form<TFormConfig extends TypeForm['TypeFormConfig']> extends Component<
  PropsReactMobxForm<TFormConfig>
> {
  handleError = () => {
    const { formConfig } = this.props;

    // eslint-disable-next-line no-console
    console.log(formConfig.notValidFieldsIds);
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <ReactMobxForm componentsMapper={componentsMapper} onError={this.handleError} {...rest}>
        {children}
      </ReactMobxForm>
    );
  }
}
