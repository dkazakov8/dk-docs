import { redirectToGenerator, TypeRedirectToParams } from 'dk-react-mobx-router';

import { routes } from 'routes';
import { TypeGlobals } from 'models';

export const redirectTo = <TRouteName extends keyof typeof routes>(
  globals: TypeGlobals,
  params: TypeRedirectToParams<typeof routes, TRouteName>
) => {
  if (IS_CLIENT) {
    window.scroll(0, 0);
  }

  return redirectToGenerator({
    routes,
    routerStore: globals.store.router,
    routeError500: routes.error500,
    lifecycleParams: [globals],
  })(params);
};
