import { MouseEvent, RefObject, CSSProperties, ReactNode } from 'react';
import { replaceDynamicValues } from 'dk-react-mobx-router/dist/utils/replaceDynamicValues';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeRouteValues } from 'routes';
import { getWebsiteUrl } from 'utils/getWebsiteUrl';

type PropsLink<T extends TypeRouteValues> = {
  route: T;
  params?: T['params'];
  onClick?: (event: MouseEvent) => boolean | undefined | void;
  onContextMenu?: (event: MouseEvent) => boolean | undefined | void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  forwardRef?: RefObject<HTMLAnchorElement>;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  addItemProp?: boolean;
  id?: string;
  data?: Record<string, any>;
};

export class Link<T extends TypeRouteValues> extends ConnectedComponent<PropsLink<T>> {
  handleClick = (event: MouseEvent) => {
    const { actions } = this.context;
    const { route, onClick, params } = this.props;

    event.preventDefault();

    if (onClick && onClick(event) === false) return;

    void actions.routing.redirectTo({ route, params });
  };

  render() {
    const {
      id,
      data,
      route,
      style,
      params,
      children,
      itemProp,
      itemType,
      className,
      itemScope,
      forwardRef,
      addItemProp,
      onContextMenu,
    } = this.props;

    const pathname = params ? replaceDynamicValues({ routesObject: route, params }) : route.path;

    let fullUrl = null;

    if (addItemProp) {
      const websiteUrl = getWebsiteUrl(this.context);

      if (websiteUrl) fullUrl = `${websiteUrl}${pathname}`;
    }

    const dataParams: Record<string, any> = {};

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        dataParams[`data-${key}`] = value;
      });
    }

    return (
      <a
        href={pathname}
        className={className}
        onClick={this.handleClick}
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
}
