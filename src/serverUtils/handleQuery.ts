import { size } from 'lodash';

import { transformers } from 'compSystem/transformers';
import { TypeGlobals } from 'models';

export const handleQuery = (req: TypeGlobals['req']) => {
  if (!req) return;

  if (size(req.query) > 0) {
    transformers.batch(() => {
      req.query = {};
      req.originalUrl = req.originalUrl.replace(/\?.+/, '');
    });
  }
};
