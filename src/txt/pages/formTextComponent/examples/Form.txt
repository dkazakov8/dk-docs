import {
  PropsReactMobxForm,
  ReactMobxForm,
  TypeGenerateFormTypes,
} from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';

import { Text, TypeInputTextConfig } from './Text';
import { TextAntd, TypeInputTextAntdConfig } from './TextAntd';
import { TextMantine, TypeInputTextMantineConfig } from './TextMantine';

export type TypeForm = TypeGenerateFormTypes<
  TypeInputTextConfig | TypeInputTextAntdConfig | TypeInputTextMantineConfig,
  any
>;

export const componentsMapper = {
  text: Text,
  textAntd: TextAntd,
  textMantine: TextMantine,
};

export const Form = observer(function Form<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: PropsReactMobxForm<TFormConfig>
) {
  return <ReactMobxForm componentsMapper={componentsMapper} {...props} />;
});
