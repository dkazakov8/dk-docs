import { createRouterConfig } from 'dk-react-mobx-router';

export const routes = createRouterConfig({
  install: {
    path: '/',
    loader: () => import('pages/install') as any,
    params: {},
  },
  textInput: {
    path: '/text-input',
    loader: () => import('pages/textInput') as any,
    params: {},
  },
  submit: {
    path: '/submit',
    loader: () => import('pages/submit') as any,
    params: {},
  },
  formConfigure: {
    path: '/form/configure',
    loader: () => import('pages/formConfigure') as any,
    params: {},
  },

  error404: {
    path: '/error404',
    loader: () => import('pages/error') as any,
    props: { errorNumber: 404 },
    params: {},
  },
  error500: {
    path: '/error500',
    loader: () => import('pages/error') as any,
    props: { errorNumber: 500 },
    params: {},
  },
} as const);

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
