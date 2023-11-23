// eslint-disable-next-line import/no-restricted-paths
import { fieldValidators } from 'utils';

import { TypeFieldValidator } from './TypeFieldValidator';

export type TypeInputTextAntdConfig = {
  type: 'textAntd';
  value: string;

  id?: string;
  label?: string;
  errors?: Array<TypeFieldValidator>;
  disabled?: boolean;
  isFocused?: boolean;
  isValidFn?: (checkOnly?: boolean) => boolean;
  validators?: Partial<Record<keyof typeof fieldValidators, TypeFieldValidator>>;
  placeholder?: string;
};
