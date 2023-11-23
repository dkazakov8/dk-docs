import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  metaTitle: 'Error',
  error404Title: '404',
  error404Subtitle: 'Page not found',
  error500Title: '500',
  error500Subtitle: 'Something goes wrong, please try again later',
});
