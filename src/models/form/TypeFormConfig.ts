import { TypeGenerateFormTypes } from 'dk-react-mobx-config-form';

import { TypeAnyInput } from './TypeAnyInput';
import { TypeInputSubmitConfig } from './TypeInputSubmitConfig';

export type TypeForm = TypeGenerateFormTypes<TypeAnyInput, TypeInputSubmitConfig>;
