import { runInAction } from 'mobx';

import { TypeGlobals } from 'models';

export const handleQuery = (req: TypeGlobals['req']) => {
  if (!req) return;

  if (Object.keys(req.query).length > 0) {
    runInAction(() => {
      req.query = {};
      req.originalUrl = req.originalUrl.replace(/\?.+/, '');
    });
  }
};
