import { getLn } from 'dk-localize';
import { createContextProps } from 'dk-react-mobx-globals';

import { TypeGlobals } from 'models';
import globalActions from 'actions';
import * as staticStores from 'stores';

import { transformers } from './transformers';

export function createGlobals(req?: TypeGlobals['req'], res?: TypeGlobals['res']) {
  const globals = createContextProps<TypeGlobals>({
    req,
    res,
    api: {},
    request: () => Promise.resolve(),
    transformers,
    staticStores,
    apiValidators: {},
    globalActions,
  });

  globals.getLn = getLn.bind(null, globals.store.ui.lnData);

  return globals;
}
