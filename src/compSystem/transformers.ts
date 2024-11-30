import { makeAutoObservable } from 'mobx';

export function classToObservableAuto<TViewModel extends Record<string, any>>(
  filename: string,
  ctx: TViewModel,
  exclude?: Array<keyof TViewModel>
) {
  const excluded = (exclude || []).reduce(
    (acc, keyName) => {
      acc[keyName] = false;

      if (typeof ctx[keyName] === 'function') {
        // @ts-ignore
        ctx[keyName] = ctx[keyName].bind(ctx);
      }

      return acc;
    },
    { context: false, systemFileName: false } as Record<keyof TViewModel, false>
  );

  Object.defineProperty(ctx, 'systemFileName', { value: filename });

  makeAutoObservable(ctx, excluded, { autoBind: true });
}
