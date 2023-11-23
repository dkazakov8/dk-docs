import { env } from '../../env';

/**
 * @docs: https://github.com/helmetjs/helmet
 * @docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */

const self = `'self'`;
const unsafeEval = `'unsafe-eval'`;
const unsafeInline = `'unsafe-inline'`;

export const helmetOptions = {
  crossOriginOpenerPolicy: true,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [self],
      childSrc: [self],
      styleSrc: [self, unsafeInline],
      scriptSrc: [
        self,
        unsafeEval,
        unsafeInline,
        `https://browser.sentry-cdn.com`,
        env.HOT_RELOAD ? `localhost:${env.HOT_RELOAD_PORT}` : '',
      ],
      fontSrc: [self, `data:`],
      objectSrc: [self, `http://10.16.52.80:*`],
      connectSrc: [
        self,
        `ws: https://*.sentry.io`,
        env.API_HOST,
        'ws:',
        'wss:',
        'http://10.16.52.80:*',
      ],
      imgSrc: [self, `data:`, `blob:`],
      frameSrc: [self, 'http://10.16.52.80:*'],
      mediaSrc: [self],
      workerSrc: [self, 'blob:'],
      formAction: [],
    },
    reportOnly: false,
  },
};
