import { autorun, isAction } from 'mobx';

import { ViewModel } from 'hooks/useStore';

export function appendAutorun(ctx: ViewModel, fn: () => void) {
  if (isAction(fn)) {
    console.error(
      `${ctx.systemFileName ? `${ctx.systemFileName}: ` : ''}appendAutorun: ${
        fn.name
      } can not be added, because it is an action. Put it in the exclude section of classToObservableAuto`
    );

    return;
  }

  if (!ctx.autorunDisposers) {
    Object.defineProperty(ctx, 'autorunDisposers', { value: [] });
  }

  const disposer = autorun(fn);

  if (fn.name) {
    Object.defineProperty(disposer, 'nameOriginal', {
      value: fn.name.replace('bound ', ''),
    });
  }

  ctx.autorunDisposers!.push(disposer);
}
