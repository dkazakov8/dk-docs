import { getLn } from 'dk-localize';
import { TypeActionGenerator, TypeGlobalsGenerator } from 'dk-react-mobx-globals';

// eslint-disable-next-line import/no-restricted-paths
import * as modularStores from 'modularStores';
// eslint-disable-next-line import/no-restricted-paths
import globalActions from 'actions';
// eslint-disable-next-line import/no-restricted-paths
import * as modularActions from 'modularActions';
// eslint-disable-next-line import/no-restricted-paths
import * as staticStores from 'stores';

/**
 * Actions
 *
 * every action function should be of TypeAction type, ex.
 *
 * export const myAction: TypeAction = (globals) => Promise.resolve()
 * export const myAction: TypeAction<{someParam: string}> = (globals, params) => Promise.resolve()
 *
 * They must always return Promise<void>.
 * if you need to place the result in store or perform data formatting, do it in action itself
 *
 */

export type TypeAction<T = undefined> = TypeActionGenerator<TypeGlobals, T>;

/**
 * Globals
 *
 * includes { api, store, actions, getLn, createWrappedAction }
 * use in every action (first argument) or connected React component (this.context)
 *
 * Good practice:
 * - use api only in actions (this way it is easy to attach handlers)
 * - don't use createWrappedAction unless absolutely necessary
 *
 */

export type TypeGlobals = TypeGlobalsGenerator<
  any,
  typeof staticStores,
  { pages: typeof modularStores },
  typeof globalActions,
  { pages: typeof modularActions },
  typeof getLn
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/naming-convention
  interface Window {
    MEASURES: Record<string, any>;
    INITIAL_DATA: Partial<TypeGlobals['store']>;
  }
}
