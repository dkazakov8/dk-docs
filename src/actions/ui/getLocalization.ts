import { TypeAction, TypeLanguage } from 'models';
import { LS } from 'utils';

type TypeParams = { language: TypeLanguage };

export const getLocalization: TypeAction<TypeParams> = ({ store }, { language }) => {
  store.ui.currentLanguage = language;

  LS.set('LANGUAGE', language);

  return Promise.resolve();
};
