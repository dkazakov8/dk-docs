import path from 'path';

import { BuildOptions } from 'esbuild';
import { modifierDirname, modifierFilename, pluginReplace } from '@espcom/esbuild-plugin-replace';

import { excludeFalsy } from '../src/utils/tsUtils/excludeFalsy';
import { env } from '../env';

export const configServer: BuildOptions = {
  entryPoints: ['src/server.ts'],
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
    pluginReplace([
      modifierDirname({ filter: /\.tsx?$/ }),
      modifierFilename({ filter: /\.tsx?$/ }),
    ]),
  ].filter(excludeFalsy),
};
