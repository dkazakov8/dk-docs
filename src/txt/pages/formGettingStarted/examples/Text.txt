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

  const { id, label, value } = inputConfig;

  return (
    <div className={styles.inputWrapper}>
      {Boolean(label) && <label htmlFor={id}>{label!}</label>}

      <div className={styles.inputInner}>
        <input
          id={id}
          name={name}
          type={'text'}
          value={value}
          onChange={(event) => {
            runInAction(() => {
              Object.assign(inputConfig, { value: event.target.value || '' });
            });
          }}
        />
      </div>
    </div>
  );
});
