import cn from 'classnames';
import { createRef, Ref } from 'react';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Icon } from 'comp/icon';
import { TypeLanguage } from 'models';
import { languages, themes } from 'const';
import { Dropdown } from 'comp/dropdown';
import { transformers } from 'compSystem/transformers';
import { getTypedKeys } from 'utils';

import { messages } from './messages';
import styles from './Header.scss';

type PropsMenuItem = {
  refItem: Ref<HTMLDivElement>;
  menuOpened: boolean;
  onOpen: () => void;
};

class LanguageItem extends ConnectedComponent<PropsMenuItem> {
  render() {
    const { getLn, actions, store } = this.context;

    const { menuOpened, onOpen, refItem } = this.props;

    const languagesItems: Array<{ language: TypeLanguage; text: string }> = languages.map(
      (language) => ({
        language,
        text: getLn(messages[language]),
      })
    );

    return (
      <div
        className={cn(styles.menuItem, menuOpened && styles.active)}
        onClick={onOpen}
        ref={refItem}
      >
        {getLn(messages.language)}
        {menuOpened && (
          <div className={cn(styles.secondLevelTooltip, styles.toLeft)}>
            {languagesItems.map((item) => (
              <div
                key={item.text}
                className={cn(
                  styles.menuItem,
                  store.ui.currentLanguage === item.language && styles.active
                )}
                onClick={() => actions.ui.getLocalization({ language: item.language })}
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

class ThemeItem extends ConnectedComponent<PropsMenuItem> {
  render() {
    const { getLn, actions, store } = this.context;

    const { menuOpened, onOpen, refItem } = this.props;

    const themeItems: Array<{ theme: keyof typeof themes; text: string }> = getTypedKeys(
      themes
    ).map((theme) => ({
      theme,
      text: getLn(messages[theme]),
    }));

    return (
      <div
        className={cn(styles.menuItem, menuOpened && styles.active)}
        onClick={onOpen}
        ref={refItem}
      >
        {getLn(messages.theme)}
        {menuOpened && (
          <div className={cn(styles.secondLevelTooltip, styles.toLeft)}>
            {themeItems.map((item) => (
              <div
                key={item.text}
                className={cn(
                  styles.menuItem,
                  store.ui.currentTheme === item.theme && styles.active
                )}
                onClick={() => actions.ui.setTheme({ theme: item.theme })}
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

type PropsUserDropdown = {
  userName: string;
};

export class UserDropdown extends ConnectedComponent<PropsUserDropdown> {
  refLanguageItem = createRef<HTMLDivElement>();
  refThemeItem = createRef<HTMLDivElement>();

  localState = transformers.observable({
    menuOpenedLanguage: false,
    menuOpenedTheme: false,
  });

  handleOpenLanguage = () => {
    transformers.batch(() => {
      this.localState.menuOpenedLanguage = !this.localState.menuOpenedLanguage;
      this.localState.menuOpenedTheme = false;
    });
  };

  handleOpenTheme = () => {
    transformers.batch(() => {
      this.localState.menuOpenedTheme = !this.localState.menuOpenedTheme;
      this.localState.menuOpenedLanguage = false;
    });
  };

  handleManualClose = (event: MouseEvent, shouldOpen: boolean) => {
    if (shouldOpen) return true;

    if (
      Boolean(this.refLanguageItem?.current?.contains(event.target as Node)) ||
      Boolean(this.refThemeItem?.current?.contains(event.target as Node))
    ) {
      return true;
    }

    transformers.batch(() => {
      this.localState.menuOpenedTheme = false;
      this.localState.menuOpenedLanguage = false;
    });

    return false;
  };

  render() {
    const { userName } = this.props;

    return (
      <Dropdown
        onClose={this.handleManualClose}
        tooltipContent={
          <>
            <LanguageItem
              refItem={this.refLanguageItem}
              menuOpened={this.localState.menuOpenedLanguage}
              onOpen={this.handleOpenLanguage}
            />
            <ThemeItem
              refItem={this.refThemeItem}
              menuOpened={this.localState.menuOpenedTheme}
              onOpen={this.handleOpenTheme}
            />
          </>
        }
        buttonProps={{ type: 'grey', className: styles.userButton, noShadow: true }}
        wrapperClassName={styles.userDropdownWrapper}
        tooltipClassName={styles.tooltipLanguage}
      >
        {userName}
        <Icon glyph={'arBottom'} className={styles.arBottomIcon} />
      </Dropdown>
    );
  }
}
