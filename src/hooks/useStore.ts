import { createUseStore, ViewModelConstructor } from 'dk-mobx-use-store';

import { TypeGlobals } from 'models';
import { StoreContext } from 'compSystem/StoreContext';

export type ViewModel = ViewModelConstructor<TypeGlobals>;

export const useStore = createUseStore(StoreContext);
