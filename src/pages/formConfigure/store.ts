import { classToObservableAuto } from 'compSystem/transformers';

// eslint-disable-next-line import/no-default-export
export default class Store {
  constructor() {
    classToObservableAuto(__filename, this);
  }
}
