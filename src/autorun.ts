import { IReactionDisposer } from 'mobx';

import { TypeGlobals } from 'models';
import { excludeFalsy } from 'utils/tsUtils/excludeFalsy';
import { messages } from 'utils/messages';
import { transformers } from 'compSystem/transformers';

function setPageTitle({ store, getLn }: TypeGlobals) {
  /**
   * On route change we only need to update page title, not all meta-tags
   *
   */

  return transformers.autorun(() => {
    if (store.ui.currentLanguage) {
      document.title = store.ui.metaData?.title
        ? getLn(store.ui.metaData.title)
        : getLn(messages.pageTitleSuffix);
    }
  });
}

function setMobileOrDesktop({ store }: TypeGlobals) {
  return transformers.autorun(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (store.ui.screen.width < 1200) document.body.classList.add('mobile');
    else document.body.classList.remove('mobile');
  });
}

function setScreenSize({ actions }: TypeGlobals) {
  window.addEventListener('resize', actions.ui.setScreenSize);
}

function setScrollTop({ actions }: TypeGlobals) {
  window.addEventListener('scroll', actions.ui.setScrollTop);
}

function setManualScrollRestoration() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

export function initAutorun(globals: TypeGlobals): Array<IReactionDisposer | void> {
  return [
    IS_CLIENT && setPageTitle,
    IS_CLIENT && setScrollTop,
    IS_CLIENT && setScreenSize,
    IS_CLIENT && setMobileOrDesktop,
    IS_CLIENT && setManualScrollRestoration,
  ]
    .filter(excludeFalsy)
    .map((fn) => fn(globals));
}
