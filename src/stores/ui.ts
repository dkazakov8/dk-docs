import { TypeTranslations } from 'dk-localize';
import { TypeThemes } from 'dk-file-generator/dist/src/plugins/theme/types';

import { classToObservableAuto } from 'compSystem/transformers';
import { themes } from 'const';
import { getTypedKeys, LS } from 'utils';
import { TypeConfirm, TypeLanguage, TypeMetaData, TypeNotification } from 'models';

// eslint-disable-next-line import/no-default-export
export default class StoreUi {
  lnData: TypeTranslations = {};
  currentLanguage: TypeLanguage = LS.get('LANGUAGE') || 'ru';
  currentTheme: keyof typeof themes = LS.get('THEME') || 'light';
  themeParams: TypeThemes[keyof typeof themes] = {};
  themesList = getTypedKeys(themes);
  metaData: TypeMetaData = {};
  screen = { width: 0, height: 0, scrollTop: 0 };
  confirm?: TypeConfirm = undefined;
  notifications: Array<TypeNotification> = [];
  contextMenuOpened = false;

  constructor() {
    classToObservableAuto(__filename, this);
  }

  get isMobile() {
    return IS_CLIENT && this.screen.width > 0 && document.body.classList.contains('mobile');
  }
}
