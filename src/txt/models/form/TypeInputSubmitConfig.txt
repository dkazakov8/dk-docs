// eslint-disable-next-line import/no-restricted-paths
import { PropsButton } from '../../comp/button';

export type TypeInputSubmitConfig = {
  type: 'submit';
  label: string;

  id?: string;
  disabled?: boolean;
  buttonProps?: Partial<PropsButton<any>>;
};
