import { TypeInputProps } from 'dk-react-mobx-config-form';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

import { TypeForm } from './Form';
import styles from './Form.scss';

export type TypeInputTextConfig = {
  type: 'text';
  value: string;

  id?: string;
  label?: string;
};

export const Text = observer(function Text<TFormConfig extends TypeForm['TypeFormConfig']>(
  props: TypeInputProps<TFormConfig, TypeInputTextConfig>
) {
  const { name, inputConfig } = props;

  return (
    <div className={styles.inputWrapper}>
      {Boolean(inputConfig.label) && <label htmlFor={inputConfig.id}>{inputConfig.label!}</label>}

      <div className={styles.inputInner}>
        <input
          id={inputConfig.id}
          name={name as string}
          type={'text'}
          value={inputConfig.value}
          onChange={(event) => {
            runInAction(() => {
              inputConfig.value = event.target.value || '';
            });
          }}
        />
      </div>
    </div>
  );
});
