import path from 'path';

import { runServer } from 'dk-bff-server';

import { helmetOptions } from 'serverUtils/helmetOptions';

import { env } from '../env';
import { paths } from '../paths';

import { isomorphPolyfills } from './utils/system/isomorphPolyfills';

process.title = 'node: bff-server';

isomorphPolyfills();

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
