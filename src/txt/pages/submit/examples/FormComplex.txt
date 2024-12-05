import {
  ReactMobxForm,
  PropsReactMobxForm,
  TypeGenerateFormTypes,
} from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';

import { Text, TypeInputTextConfig } from './Text';
import { SubmitComplex, TypeInputSubmitConfig } from './SubmitComplex';

export type TypeForm = TypeGenerateFormTypes<TypeInputTextConfig, TypeInputSubmitConfig>;

export const componentsMapper = {
  text: Text,
  submit: SubmitComplex,
};

export const FormComplex = observer(function Form<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: PropsReactMobxForm<TFormConfig>
) {
  return <ReactMobxForm componentsMapper={componentsMapper} {...props} />;
});
