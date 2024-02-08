import cn from 'classnames';

import { icons } from 'assets/icons';

import styles from './Icon.scss';

export type PropsIcon = {
  id?: string;
  glyph: keyof typeof icons;
  title?: string;
  onClick?: any;
  className?: string;
  onMouseEnter?: () => void;
};

export function Icon(props: PropsIcon) {
  const { glyph, className, ...rest } = props;

  const iconContent = icons[glyph];

  if (!iconContent) {
    console.error(`Icon: no icon for glyph ${glyph}`);

    return null;
  }

  return (
    <div
      {...rest}
      className={cn(styles.icon, className)}
      dangerouslySetInnerHTML={{ __html: iconContent }}
    />
  );
}
