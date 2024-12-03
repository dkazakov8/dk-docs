import React, { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react';
import { replaceDynamicValues, TypeRedirectToParams } from 'dk-react-mobx-router';

import { useStore, ViewModel } from 'hooks/useStore';
import { TypeGlobals } from 'models';
import { classToObservableAuto } from 'compSystem/transformers';
import { routes } from 'routes';

type PropsLink<TRouteName extends keyof typeof routes> = TypeRedirectToParams<
  typeof routes,
  TRouteName
> & {
  onClick?: (event: MouseEvent) => boolean | undefined | void;
  onContextMenu?: (event: MouseEvent) => boolean | undefined | void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  forwardRef?: RefObject<HTMLAnchorElement>;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  id?: string;
  data?: Record<string, any>;
};

class VM<TRouteName extends keyof typeof routes> implements ViewModel {
  constructor(
    public context: TypeGlobals,
    public props: PropsLink<TRouteName>
  ) {
    classToObservableAuto(__filename, this);
  }

  handleClick = (event: MouseEvent) => {
    const { actions } = this.context;
    const { route, onClick } = this.props;

    event.preventDefault();

    if (onClick && onClick(event) === false) return;

    // @ts-ignore
    void actions.routing.redirectTo({ route, params: (this.props as any).params });
  };
}

export function Link<TRouteName extends keyof typeof routes>(props: PropsLink<TRouteName>) {
  const { vm, context } = useStore(VM<TRouteName>, props);

  const {
    id,
    data,
    route: routeName,
    style,
    children,
    itemProp,
    itemType,
    className,
    itemScope,
    forwardRef,
    onContextMenu,
  } = props;

  const route = routes[routeName];

  const pathname =
    'params' in props ? replaceDynamicValues({ route, params: props.params }) : route.path;

  const fullUrl = pathname;

  const dataParams: Record<string, any> = {};

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      dataParams[`data-${key}`] = value;
    });
  }

  let hidden = false;

  try {
    if ((route as any).beforeEnter) (route as any).beforeEnter({}, context, true);

    hidden = false;
  } catch (e) {
    hidden = true;
  }

  if (hidden) return null;

  return (
    <a
      href={pathname}
      className={className}
      onClick={vm.handleClick}
      ref={forwardRef}
      style={style}
      itemProp={itemProp}
      itemType={itemType}
      itemScope={itemScope}
      id={id}
      onContextMenu={onContextMenu}
      {...dataParams}
    >
      {children}
      {Boolean(fullUrl) && <meta itemProp={'item'} content={fullUrl!} />}
    </a>
  );
}
