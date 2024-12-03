import { createRouterConfig } from 'dk-react-mobx-router';

import { env } from 'env';

export const routes = createRouterConfig({
  install: {
    path: `${env.ASSETS_PREFIX}/`,
    loader: () => import('pages/install') as any,
    params: {},
  },
  textInput: {
    path: `${env.ASSETS_PREFIX}/text-input`,
    loader: () => import('pages/textInput') as any,
    params: {},
  },
  submit: {
    path: `${env.ASSETS_PREFIX}/submit`,
    loader: () => import('pages/submit') as any,
    params: {},
  },
  formConfigure: {
    path: `${env.ASSETS_PREFIX}/form/configure`,
    loader: () => import('pages/formConfigure') as any,
    params: {},
  },

  error404: {
    path: `${env.ASSETS_PREFIX}/error404`,
    loader: () => import('pages/error') as any,
    props: { errorNumber: 404 },
    params: {},
  },
  error500: {
    path: `${env.ASSETS_PREFIX}/error500`,
    loader: () => import('pages/error') as any,
    props: { errorNumber: 500 },
    params: {},
  },
} as const);

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
