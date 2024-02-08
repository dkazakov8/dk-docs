import { PropsReactMobxForm, ReactMobxForm } from 'dk-react-mobx-config-form';

import { TypeAnyInput, TypeForm, TypeInputSubmitConfig } from 'models';

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

export function Form<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: PropsReactMobxForm<TFormConfig>
) {
  return <ReactMobxForm componentsMapper={componentsMapper} {...props} />;
}
