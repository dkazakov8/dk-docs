/* eslint-disable react/no-set-state, @typescript-eslint/naming-convention */

import React from 'react';
import { getPlainActions } from 'dk-react-mobx-globals';
import { Router as RouterMobx } from 'dk-react-mobx-router';
import { runInAction } from 'mobx';

import { routes } from 'routes';
import { getTypedEntries, getTypedKeys } from 'utils';
import { env } from 'env';
import { TypeGlobals } from 'models';
import { useStore, ViewModel } from 'hooks/useStore';

import { classToObservableAuto } from './transformers';

const modularStorePath = 'pages' as const;
const logs = env.LOGS_STORE_SETTER;
const logsCanceledActions = env.LOGS_CANCELED_ACTIONS;

class VM implements ViewModel {
  constructor(public context: TypeGlobals) {
    classToObservableAuto(__filename, this);
  }

  beforeSetPageComponent(componentConfig: any) {
    if (componentConfig.store) {
      this.extendStores({ [componentConfig.pageName!]: componentConfig.store });
    }
    if (componentConfig.actions) {
      this.extendActions({ [componentConfig.pageName!]: componentConfig.actions });
    }
  }

  beforeUpdatePageComponent() {
    if (IS_CLIENT) {
      this.cancelExecutingApi();
      this.cancelExecutingActions();
    }
    this.clearPages();
  }

  log(message: string) {
    const logsPrefix = '%c[Router]%c';

    if (logs) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: initial']);
    }
  }

  clearPages() {
    this.context.store[modularStorePath] = {} as any;
    this.context.actions[modularStorePath] = {} as any;

    this.log(
      `"store.${modularStorePath}" and "actions.${modularStorePath}" have been set to empty objects`
    );
  }

  logCanceled(message: string) {
    const logsPrefix = '%c[Router] %c[canceled]%c';

    if (logsCanceledActions) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: red', 'color: initial']);
    }
  }

  cancelExecutingApi() {
    const apiExecuting = Object.values(this.context.api).filter((apiFn) => apiFn.state.isExecuting);

    if (apiExecuting.length) {
      runInAction(() => {
        apiExecuting.forEach((apiFn) => {
          apiFn.state.isCancelled = true;
        });
      });

      this.logCanceled(apiExecuting.map((apiFn) => `api.${apiFn.name}`).join(', '));
    }
  }

  cancelExecutingActions() {
    const pagesObject = this.context.actions[modularStorePath];

    const moduleActionsExecuting = getPlainActions(pagesObject as any).filter(
      (actionFn) => actionFn.state.isExecuting
    );

    if (moduleActionsExecuting.length) {
      runInAction(() => {
        moduleActionsExecuting.forEach((actionFn) => {
          actionFn.state.isCancelled = true;
        });
      });

      this.logCanceled(moduleActionsExecuting.map((actionFn) => `${actionFn.name}`).join(', '));
    }
  }

  extendStores(stores: Partial<TypeGlobals['store'][typeof modularStorePath]>) {
    const { store } = this.context;

    if (!stores) return;

    const pagesObject = store[modularStorePath];

    getTypedKeys(stores).forEach((storeName) => {
      if (pagesObject[storeName]) return;

      /**
       * Client should recreate dynamic stores with initial data passed from server,
       * because SSR does not serialize get() & set() statements
       *
       */

      // @ts-ignore
      pagesObject[storeName] = new stores[storeName]!();

      this.log(`store has been extended with "store.${modularStorePath}.${storeName}"`);
    });
  }

  extendActions(actions: Partial<TypeGlobals['actions'][typeof modularStorePath]>) {
    if (!actions) return;

    /**
     * When actions are mocked during SSR no need to waste time on wrapping
     *
     */

    const pagesObject = this.context.actions[modularStorePath];

    getTypedKeys(actions).forEach((actionGroupName) => {
      if (pagesObject[actionGroupName]) return;

      const actionGroup = actions[actionGroupName]!;

      // @ts-ignore
      pagesObject[actionGroupName] = getTypedEntries(actionGroup).reduce(
        // @ts-ignore
        (acc, [actionName, fn]) => {
          acc[actionName] = this.context.createWrappedAction(fn);

          return acc;
        },
        {} as any
      );

      this.log(`actions have been extended with "actions.${modularStorePath}.${actionGroupName}"`);
    });
  }
}

export function Router() {
  const { context, vm } = useStore(VM);

  return (
    <RouterMobx
      routes={routes}
      redirectTo={context.actions.routing.redirectTo}
      routerStore={context.store.router}
      beforeMount={vm.clearPages}
      beforeSetPageComponent={vm.beforeSetPageComponent}
      beforeUpdatePageComponent={vm.beforeUpdatePageComponent}
    />
  );
}
