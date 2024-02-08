import { useContext, useEffect, useState } from 'react';
import { IReactionDisposer } from 'mobx';

import { TypeGlobals } from 'models';
import { StoreContext } from 'compSystem/StoreContext';
import { transformers } from 'compSystem/transformers';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface AbsViewModel {
  props?: any;
  context: TypeGlobals;
  beforeMount?: () => void;
  afterMount?: () => void;
  beforeUnmount?: () => void;
  autorunDisposers?: Array<IReactionDisposer>;
}

type TypeAbsClass = new (context: TypeGlobals, p?: any) => AbsViewModel;

class DefaultViewModel implements AbsViewModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(public context: TypeGlobals) {}
  props = undefined;
  autorunDisposers = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeMount() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afterMount() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeUnmount() {}
}

export function useStore<TViewModel extends TypeAbsClass>(ViewModel?: TViewModel, props?: any) {
  const context = useContext(StoreContext);
  const [vm] = useState(() => {
    const instance = new (ViewModel || DefaultViewModel)(
      context,
      transformers.observable(props || {})
    );

    transformers.batch(() => {
      instance.beforeMount?.();
    });

    return instance;
  });

  useEffect(() => {
    vm.afterMount?.();

    return () => {
      vm.autorunDisposers?.forEach((d) => d());
      vm.beforeUnmount?.();
    };
  }, []);

  useEffect(() => {
    if (props) {
      transformers.batch(() => {
        Object.assign(vm.props, props);
      });
    }
  }, [props]);

  return { context, vm } as { vm: InstanceType<TViewModel>; context: TypeGlobals };
}
