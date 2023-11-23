import { TypeInputTextConfig } from './TypeInputTextConfig';
import { TypeInputTextAntdConfig } from './TypeInputTextAntdConfig';
import { TypeInputTextMantineConfig } from './TypeInputTextMantineConfig';

export type TypeAnyInput =
  | TypeInputTextConfig
  | TypeInputTextAntdConfig
  | TypeInputTextMantineConfig;
