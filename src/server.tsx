import path from 'path';

import { runServer } from 'dk-bff-server';

import { analytic } from 'serverUtils/analytic';
import { handleQuery } from 'serverUtils/handleQuery';
import { helmetOptions } from 'serverUtils/helmetOptions';

import { env } from '../env';
import { paths } from '../paths';

import { isomorphPolyfills } from './utils/system/isomorphPolyfills';

process.title = 'node: bff-server';

isomorphPolyfills();

void runServer({
  port: env.EXPRESS_PORT,
  https: env.HTTPS_BY_NODE,
  templatePath: path.resolve(paths.build, 'template.html'),
  template500Path: path.resolve(paths.build, 'error500.html'),
  staticFilesPath: paths.build,
  versionIdentifier: env.GIT_COMMIT,
  compressedFilesGenerated: env.GENERATE_COMPRESSED,
  templateModifier: ({ template, req }) => {
    try {
      handleQuery(req);
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve().then(() => {
      const hotReloadUrl = `${env.HTTPS_BY_NODE ? 'https' : 'http'}://${req.headers.host}:${
        env.HOT_RELOAD_PORT
      }`;

      return template
        .replace(
          '<!-- HOT_RELOAD -->',
          env.HOT_RELOAD ? `<script src="${hotReloadUrl}"></script>` : ''
        )
        .replace('<!-- SENTRY -->', env.SENTRY_URL ? analytic.sentryScript : '');
    });
  },
  injectMeasures: ({ template, measures }) =>
    template.replace('<!-- MEASURES -->', JSON.stringify({ server: measures }, null, 2)),
  helmetOptions,
});
