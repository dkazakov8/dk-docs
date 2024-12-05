import path from 'path';

import { runServer } from 'dk-bff-server';

import { env } from '../env';
import { paths } from '../paths';

import { isomorphPolyfills } from './utils/system/isomorphPolyfills';

process.title = 'node: bff-server';

isomorphPolyfills();

/**
 * @docs: https://github.com/helmetjs/helmet
 * @docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */

const self = `'self'`;
const unsafeEval = `'unsafe-eval'`;
const unsafeInline = `'unsafe-inline'`;

const helmetOptions = {
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
      objectSrc: [self],
      connectSrc: [self, `ws: https://*.sentry.io`, 'ws:', 'wss:'],
      imgSrc: [self, `data:`, `blob:`],
      frameSrc: [self],
      mediaSrc: [self],
      workerSrc: [self, 'blob:'],
      formAction: [],
    },
    reportOnly: false,
  },
};

void runServer({
  port: env.EXPRESS_PORT,
  https: env.HTTPS_BY_NODE,
  templatePath: path.resolve(paths.build, 'index.html'),
  template500Path: path.resolve(paths.build, 'error500.html'),
  staticFilesPath: paths.build,
  versionIdentifier: env.GIT_COMMIT,
  compressedFilesGenerated: env.GENERATE_COMPRESSED,
  templateModifier: ({ template, req }) => {
    return Promise.resolve().then(() => {
      const hotReloadUrl = `${env.HTTPS_BY_NODE ? 'https' : 'http'}://${req.headers.host}:${
        env.HOT_RELOAD_PORT
      }`;

      return template.replace(
        '<!-- HOT_RELOAD -->',
        env.HOT_RELOAD ? `<script src="${hotReloadUrl}"></script>` : ''
      );
    });
  },
  injectMeasures: ({ template, measures }) =>
    template.replace('<!-- MEASURES -->', JSON.stringify({ server: measures }, null, 2)),
  helmetOptions,
});
