import {
  ReactMobxForm,
  PropsReactMobxForm,
  TypeGenerateFormTypes,
} from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';

import { Text, TypeInputTextConfig } from './Text';

export type TypeForm = TypeGenerateFormTypes<TypeInputTextConfig, any>;

export const componentsMapper = {
  text: Text,
};

export const Form = observer(function Form<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: PropsReactMobxForm<TFormConfig>
) {
  return <ReactMobxForm componentsMapper={componentsMapper} {...props} />;
});
