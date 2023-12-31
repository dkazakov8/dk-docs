/* eslint-disable @typescript-eslint/naming-convention */
import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  example_title: 'A short Title Is Best. A message could be a short, complete sentence',
  tasksBatch_header: 'Batch tasks operations',
  tasksBatch_colName: 'Name',
  tasksBatch_colScriptName: 'Script',
  tasksBatch_colStatus: 'Status',
  tasksBatch_colCompleted: 'Last completed',
  editLeftovers_header: 'Edit leftovers',
});
