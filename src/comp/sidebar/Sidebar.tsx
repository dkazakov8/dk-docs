import cn from 'classnames';

import { Link } from 'comp/link';
import { routes, TypeRouteValues } from 'routes';
import { useStore } from 'hooks/useStore';

import { messages } from './messages';
import styles from './Sidebar.scss';

export function Sidebar() {
  const { context } = useStore();

  const { store, getLn } = context;

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
      title: 'Основы работы',
      children: [
        {
          title: 'Установка и настройка',
          route: routes.formGettingStarted,
          activeOn: [routes.formGettingStarted],
        },
        {
          title: 'Продвинутый инпут + Mantine + Antd',
          route: routes.formTextComponent,
          activeOn: [routes.formTextComponent],
        },
        {
          title: getLn(messages.formsSubmitComponent),
          route: routes.formSubmitComponent,
          activeOn: [routes.formSubmitComponent],
        },
        {
          title: getLn(messages.formConfigure),
          route: routes.formConfigure,
          activeOn: [routes.formConfigure],
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
                  route={childConfig.route.name}
                  params={{}}
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
