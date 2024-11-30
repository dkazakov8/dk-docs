import { createRouterConfig } from 'dk-react-mobx-router';

export const routes = createRouterConfig({
  formGettingStarted: {
    path: '/',
    loader: () => import('pages/formGettingStarted') as any,
    params: {},
  },
  formTextComponent: {
    path: '/form/text-component',
    loader: () => import('pages/formTextComponent') as any,
    params: {},
  },
  formSubmitComponent: {
    path: '/form/submit-component',
    loader: () => import('pages/formSubmitComponent') as any,
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
