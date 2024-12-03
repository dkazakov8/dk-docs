/* eslint-disable @typescript-eslint/naming-convention */

import path from 'path';

import { pluginWebpackAnalyzer } from '@espcom/esbuild-plugin-webpack-analyzer';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import { BuildOptions } from 'esbuild';
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import {
  pluginReplace,
  modifierLodash,
  modifierDirname,
  modifierFilename,
  modifierMobxObserverFC,
} from '@espcom/esbuild-plugin-replace';
import { pluginInjectPreload } from '@espcom/esbuild-plugin-inject-preload';
import { pluginCompress } from '@espcom/esbuild-plugin-compress';

import { excludeFalsy } from '../src/utils/tsUtils/excludeFalsy';
import { env } from '../env';
import { paths } from '../paths';

import { pluginPushToOutput } from './pluginPushToOutput';

export const configClient: BuildOptions = {
  entryPoints: ['src/client.tsx'],
  bundle: true,
  logLevel: 'warning',
  format: 'iife',
  publicPath: '/',
  entryNames: env.FILENAME_HASH ? '[ext]/[name]-[hash]' : '[ext]/[name]',
  assetNames: env.FILENAME_HASH ? '[ext]/[name]-[hash]' : '[ext]/[name]',
  chunkNames: env.FILENAME_HASH ? '[ext]/[name]-[hash]' : '[ext]/[name]',
  outdir: paths.build,
  write: false,
  metafile: true,
  minify: env.MINIMIZE_CLIENT,
  keepNames: true,
  treeShaking: true,
  sourcemap: 'linked',
  banner: {
    js: `/* @env ${env.NODE_ENV} @commit ${env.GIT_COMMIT} */`,
    css: `/* @env ${env.NODE_ENV} @commit ${env.GIT_COMMIT} */`,
  },
  legalComments: 'external',
  platform: 'browser',
  // https://github.com/nihalgonsalves/esbuild-plugin-browserslist
  target: resolveToEsbuildTarget(browserslist(), { printUnknownTargets: false }),
  define: {
    IS_CLIENT: JSON.stringify(true),
    process: JSON.stringify({
      env: {
        NODE_ENV: env.NODE_ENV,
        GIT_COMMIT: env.GIT_COMMIT,
        LOGS_MEASURES: env.LOGS_MEASURES,
        LOGS_STORE_SETTER: env.LOGS_STORE_SETTER,
        LOGS_RESTORE_INITIAL: env.LOGS_RESTORE_INITIAL,
        LOGS_CANCELED_ACTIONS: env.LOGS_CANCELED_ACTIONS,
        LOGS_EXECUTING_ACTIONS: env.LOGS_EXECUTING_ACTIONS,
      },
    }),
    'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    PATH_SEP: JSON.stringify(path.sep),
  },
  resolveExtensions: ['.js', '.ts', '.tsx'],
  loader: {
    '.svg': 'text',
    '.png': 'file',
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
  },
  plugins: [
    pluginReplace([
      modifierDirname({ filter: /\.tsx?$/ }),
      modifierFilename({ filter: /\.tsx?$/ }),
      modifierLodash({ filter: /\.tsx?$/ }),
      modifierMobxObserverFC({ filter: /\.tsx?$/ }),
    ]),

    // https://github.com/glromeo/esbuild-sass-plugin
    sassPlugin({ filter: /global\.scss$/, type: 'css', loadPaths: [paths.styles] }),
    sassPlugin({
      filter: /\.scss$/i,
      type: 'css',
      loadPaths: [paths.styles],

      // https://github.com/madyankin/postcss-modules
      transform: postcssModules({ generateScopedName: '[path][local]' }),
    }),

    pluginInjectPreload([
      {
        templatePath: path.resolve(paths.build, 'index.html'),
        replace: '<!-- ENTRY_CSS --><!-- /ENTRY_CSS -->',
        // eslint-disable-next-line consistent-return
        as(filePath) {
          if (/client([^.]+)?\.css$/.test(filePath)) {
            return `<link rel="stylesheet" type="text/css" href="${env.ASSETS_PREFIX}${filePath}" />`;
          }
        },
      },
      {
        templatePath: path.resolve(paths.build, 'index.html'),
        replace: '<!-- ENTRY_JS --><!-- /ENTRY_JS -->',
        // eslint-disable-next-line consistent-return
        as(filePath) {
          if (/client([^.]+)?\.js$/.test(filePath)) {
            return `<script src="${env.ASSETS_PREFIX}${filePath}" defer=""></script>`;
          }
        },
      },
      {
        templatePath: path.resolve(paths.build, 'index.html'),
        replace: '<!-- FONT_PRELOAD --><!-- /FONT_PRELOAD -->',
        // eslint-disable-next-line consistent-return
        as(filePath) {
          if (filePath.endsWith('.woff')) {
            return `<link as="font" crossorigin="anonymous" href="${env.ASSETS_PREFIX}${filePath}" rel="preload">`;
          }
        },
      },
    ]),

    pluginPushToOutput(),

    pluginCompress({
      gzip: false,
      brotli: false,
      zstd: false,
      level: 'high',
      extensions: ['.js', '.css'],
    }),

    env.BUNDLE_ANALYZER &&
      pluginWebpackAnalyzer({
        port: env.BUNDLE_ANALYZER_PORT,
        open: false,
      }),
  ].filter(excludeFalsy),
};
