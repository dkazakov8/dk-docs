/* eslint-disable */
// @ts-nocheck

// ...

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

// ...
