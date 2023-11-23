import path from 'path';

import { BuildOptions } from 'esbuild';
import { pluginReplace } from 'dk-esbuild-plugin-replace';

import { env } from '../env';
import { paths } from '../paths';

import { pluginLog } from './pluginLog';

export const configServer: BuildOptions = {
  entryPoints: ['src/server.tsx'],
  bundle: true,
  metafile: true,
  treeShaking: true,
  sourcemap: false,
  outdir: 'build/',
  platform: 'node',
  minify: env.MINIMIZE_SERVER,
  logLevel: 'warning',
  legalComments: 'external',
  packages: 'external',
  target: 'node18',
  define: {
    IS_CLIENT: 'false',
    PATH_SEP: JSON.stringify(path.sep),
  },
  plugins: [
    pluginReplace({
      filter: /\.(tsx?)$/,
      rootDir: paths.root,
    }),
    pluginLog({ name: 'server', watch: env.START_SERVER_AFTER_BUILD && env.HOT_RELOAD }),
  ],
};
