import cn from 'classnames';

import { TypeRouteValues } from 'routes';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Link } from 'comp/link';

import styles from './Tabs.scss';

export type TypeNavLinks = Array<{
  route: TypeRouteValues;
  activeOn: Array<TypeRouteValues>;
  params?: Record<string, any>;
  message: string;
}>;

type PropsTabs = {
  navLinks: TypeNavLinks;
  size: 'big' | 'small';
  mode?: 'vertical';
  itemClassName?: string;
};

export class Tabs extends ConnectedComponent<PropsTabs, TypeRouteValues> {
  render() {
    const { store } = this.context;
    const { navLinks, size, itemClassName, mode } = this.props;

    const currentRoute = store.router.currentRoute;

    return (
      <div className={cn(styles.navList, styles[size], mode === 'vertical' && styles.vertical)}>
        {navLinks.map((config) => {
          const activeByRoute = config.activeOn.map((r) => r.name).includes(currentRoute.name);
          const sameParams = !config.params
            ? true
            : JSON.stringify(config.params) === JSON.stringify(currentRoute.params);

          return (
            <Link
              key={config.message}
              route={config.route}
              params={config.params}
              className={cn(
                styles.navLink,
                activeByRoute && sameParams && styles.active,
                itemClassName
              )}
            >
              {config.message}
            </Link>
          );
        })}
      </div>
    );
  }
}
