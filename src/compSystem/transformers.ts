import {
  action,
  autorun,
  observable,
  runInAction,
  toJS,
  makeAutoObservable,
  computed,
  makeObservable,
} from 'mobx';
// import { observer } from 'mobx-react';
import { observer } from 'mobx-react-lite';

export const transformers = {
  toJS,
  batch: runInAction,
  action,
  autorun,
  computed,
  observer,
  observable,
  classToObservable: makeAutoObservable,
  classToObservableManual: makeObservable,
};
