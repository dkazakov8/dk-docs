// eslint-disable-next-line import/no-restricted-paths
import { themes } from 'const';

import { TypeLanguage } from './TypeLanguage';

export type TypeLS = {
  LANGUAGE: TypeLanguage;
  FONDS_VIEW: 'cards' | 'table';
  TASKS_VIEW: 'cards' | 'table';
  THEME: keyof typeof themes;
};
