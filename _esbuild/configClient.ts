/* eslint-disable @typescript-eslint/naming-convention */

import path from 'path';
import fs from 'fs';

import { pluginWebpackAnalyzer } from 'esbuild-plugin-webpack-analyzer';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { compress } from 'esbuild-plugin-compress';
import { BuildOptions } from 'esbuild';
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import { pluginReplace } from 'dk-esbuild-plugin-replace';
import { pluginInjectPreload } from 'esbuild-plugin-inject-preload';

import { excludeFalsy } from '../src/utils/tsUtils/excludeFalsy';
import { env } from '../env';
import { paths } from '../paths';

import { pluginLog } from './pluginLog';

const template = fs.readFileSync(path.resolve('./src/templates/templateEs.html'), 'utf-8');

export const configClient: BuildOptions = {
  entryPoints: ['src/client.tsx'],
  bundle: true,
  logLevel: 'warning',
  format: 'iife',
  publicPath: '/',
  // assetNames: '[ext]/[name]-[hash]', // not working with compress plugin
  assetNames: env.FILENAME_HASH ? '[name]-[hash]' : '[name]',
  chunkNames: env.FILENAME_HASH ? '[name]-[hash]' : '[name]',
  outdir: paths.build,
  write: !env.GENERATE_COMPRESSED,
  metafile: true,
  minify: env.MINIMIZE_CLIENT,
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
    '.txt': 'text',
    '.png': 'file',
    '.woff': 'file',
    '.ttf': 'file',
  },
  plugins: [
    pluginReplace({ filter: /\.(tsx?)$/, rootDir: paths.root }),

    // https://github.com/glromeo/esbuild-sass-plugin
    sassPlugin({ filter: /(global)\.scss$/, type: 'css', loadPaths: ['./src/styles'] }),
    sassPlugin({
      filter: /\.scss$/i,
      type: 'css',
      loadPaths: ['./src/styles'],

      // https://github.com/madyankin/postcss-modules
      transform: postcssModules({ generateScopedName: '[path][local]' }),
    }),

    // https://github.com/craftamap/esbuild-plugin-html
    htmlPlugin({
      files: [
        {
          entryPoints: ['src/client.tsx'],
          filename: 'template.html',
          scriptLoading: 'defer',
          define: { env: env.NODE_ENV, commitHash: env.GIT_COMMIT },
          htmlTemplate: template,
        },
      ],
    }),
    pluginInjectPreload({
      ext: '.woff',
      linkType: 'font',
      templatePath: path.resolve(paths.build, 'template.html'),
      replaceString: '<!-- FONT_PRELOAD -->',
    }),

    // https://github.com/LinbuduLab/esbuild-plugins/tree/main/packages/esbuild-plugin-compress
    env.GENERATE_COMPRESSED &&
      compress({
        gzip: true,
        gzipOptions: { level: 9 },
        brotli: true,
        emitOrigin: true,
        // https://github.com/micromatch/micromatch
        exclude: ['!(**/*.@(js|css))'],
      }),

    pluginLog({ name: 'client', watch: env.START_SERVER_AFTER_BUILD && env.HOT_RELOAD }),

    env.BUNDLE_ANALYZER &&
      pluginWebpackAnalyzer({
        port: env.BUNDLE_ANALYZER_PORT,
        open: false,
      }),
  ].filter(excludeFalsy),
};
