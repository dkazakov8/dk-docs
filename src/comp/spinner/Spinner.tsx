import cn from 'classnames';

import styles from './Spinner.scss';

type PropsSpinner = {
  size: number;
  className?: string;
};

export function Spinner(props: PropsSpinner) {
  const { className, size } = props;

  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return <div style={style} className={cn(styles.spinner, className)} />;
}
