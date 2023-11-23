import { ReactMobxForm, PropsReactMobxForm } from 'dk-react-mobx-config-form';
import { Component } from 'react';

import { TypeForm, TypeAnyInput, TypeInputSubmitConfig } from 'models';

import { Text } from './inputs/Text';
import { TextAntd } from './inputs/TextAntd';
import { TextMantine } from './inputs/TextMantine';
import { Submit } from './inputs/Submit';

export const componentsMapper: Record<
  TypeAnyInput['type'],
  typeof Text | typeof TextAntd | typeof TextMantine
> &
  Record<TypeInputSubmitConfig['type'], typeof Submit> = {
  submit: Submit,
  text: Text,
  textAntd: TextAntd,
  textMantine: TextMantine,
};

export class Form<TFormConfig extends TypeForm['TypeFormConfig']> extends Component<
  PropsReactMobxForm<TFormConfig>
> {
  render() {
    return <ReactMobxForm componentsMapper={componentsMapper} {...this.props} />;
  }
}
