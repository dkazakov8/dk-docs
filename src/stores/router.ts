import { InterfaceRouterStore } from 'dk-react-mobx-router';

import { classToObservableAuto } from 'compSystem/transformers';
import { routes } from 'routes';

type TInterfaceRouterStore = InterfaceRouterStore<typeof routes>;

// eslint-disable-next-line import/no-default-export
export default class RouterStore implements TInterfaceRouterStore {
  constructor() {
    classToObservableAuto(__filename, this);
  }

  routesHistory: TInterfaceRouterStore['routesHistory'] = [];
  currentRoute: TInterfaceRouterStore['currentRoute'] = {} as any;
}
