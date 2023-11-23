// import translations from 'translations.json';

import { TypeAction, TypeLanguage } from 'models';
import { LS } from 'utils';

type TypeParams = { language: TypeLanguage };

export const getLocalization: TypeAction<TypeParams> = ({ store }, { language }) => {
  store.ui.currentLanguage = language;

  LS.set('LANGUAGE', language);

  // const translationsLocalized = Object.entries(translations).reduce((acc, [id, data]) => {
  //   // @ts-ignore
  //   acc[id] = data[language] || data.defaultValue;
  //
  //   return acc;
  // }, {});
  //
  // Object.assign(store.ui.lnData, translationsLocalized);

  return Promise.resolve();
};
