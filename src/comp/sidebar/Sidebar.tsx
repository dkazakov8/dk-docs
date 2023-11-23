import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Link } from 'comp/link';
import { routes, TypeRouteValues } from 'routes';

import { messages } from './messages';
import styles from './Sidebar.scss';

export class Sidebar extends ConnectedComponent<{}, TypeRouteValues> {
  render() {
    const { store, getLn } = this.context;

    const currentRoute = store.router.currentRoute;

    const sidebarBlocks: Array<{
      title: string;
      children: Array<{
        activeOn: Array<TypeRouteValues>;
        title: string;
        route: TypeRouteValues;
      }>;
    }> = [
      {
        title: getLn(messages.forms),
        children: [
          {
            title: getLn(messages.formsGettingStarted),
            route: routes.formGettingStarted,
            activeOn: [routes.formGettingStarted],
          },
          {
            title: getLn(messages.formsTextComponent),
            route: routes.formTextComponent,
            activeOn: [routes.formTextComponent],
          },
          {
            title: getLn(messages.formsSubmitComponent),
            route: routes.formSubmitComponent,
            activeOn: [routes.formSubmitComponent],
          },
        ],
      },
    ];

    return (
      <div className={styles.sidebar}>
        {sidebarBlocks.map((config) => {
          return (
            <div key={config.title} className={styles.block}>
              <div className={styles.firstTitle}>{config.title}</div>
              {config.children.map((childConfig) => {
                const activeByRoute = childConfig.activeOn
                  .map((r) => r.name)
                  .includes(currentRoute.name);

                return (
                  <Link
                    key={childConfig.title}
                    route={childConfig.route}
                    className={cn(styles.secondTitle, activeByRoute && styles.active)}
                  >
                    {childConfig.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
