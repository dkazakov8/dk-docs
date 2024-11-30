import path from 'path';
import fs from 'fs';

import betterSpawn from 'better-spawn';
import { green } from 'colorette';
import { compareEnvFiles } from 'dk-compare-env';
import { generateFiles } from 'dk-file-generator';
import esbuild, { BuildContext } from 'esbuild';
import fsExtra from 'fs-extra';
import { runManual } from 'dk-reload-server';

import { env } from '../env';
import { paths } from '../paths';
import { generatorConfigs } from '../generator/generator.config';

import { configServer } from './configServer';
import { configClient } from './configClient';
import { logBuildTime } from './logBuildTime';

process.title = 'node: Esbuild builder';

/**
 * @docs: https://github.com/paulpflug/better-spawn
 * @docs: https://github.com/fgnass/node-dev
 *
 */

let serverProcess: ReturnType<typeof betterSpawn>;
let reloadServerProcess: ReturnType<typeof betterSpawn>;
let sendReload: (() => void) | undefined;

function makeTxtFiles() {
  const files = [
    path.resolve(paths.models, 'form/TypeFieldValidator.ts'),
    path.resolve(paths.models, 'form/TypeFormConfig.ts'),
    path.resolve(paths.utils, 'form/fieldValidators.ts'),
    path.resolve(paths.source, 'comp/form/Form.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/Submit.tsx'),
    path.resolve(paths.models, 'form/TypeInputSubmitConfig.ts'),
    path.resolve(paths.source, 'pages/formSubmitComponent/examples/ExampleSubmit.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/Text.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextConfig.ts'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleRegularInput.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleRegularAllCases.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/TextAntd.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextAntdConfig.ts'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleAntdInput.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleAntdAllCases.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/TextMantine.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextMantineConfig.ts'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleMantineInput.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleMantineAllCases.tsx'),

    path.resolve(paths.source, 'pages/formConfigure/examples/ExampleDefault.tsx'),
  ];

  files.forEach((p) => {
    const content = fs.readFileSync(p, 'utf-8');
    fsExtra.outputFileSync(
      path.resolve(paths.source, 'txt', path.relative(paths.source, p).replace(/\.tsx?/, '.txt')),
      content
    );
  });
}

function afterFirstBuild() {
  fsExtra.copySync(path.resolve(paths.source, 'templates'), paths.build, { overwrite: false });

  if (env.GENERATE_COMPRESSED) {
    fs.readdirSync(paths.build).forEach((fileName, index, arr) => {
      if (fileName.endsWith('.css') || fileName.endsWith('.js')) {
        if (!arr.includes(`${fileName}.gz`)) {
          // eslint-disable-next-line no-console
          console.log(fileName, 'HAS NO .gz VERSION!');
        }
        if (!arr.includes(`${fileName}.br`)) {
          // eslint-disable-next-line no-console
          console.log(fileName, 'HAS NO .br VERSION!');
        }
      }
    });
  }

  /**
   * Start server & proxy it's stdout/stderr to current console
   *
   */

  if (!env.START_SERVER_AFTER_BUILD) return;

  const SERVER_LOG_PREFIX = green('[server]');

  serverProcess = betterSpawn(
    'node-dev --no-warnings --notify=false -r dotenv/config ./build/server.js',
    {
      stdio: ['pipe', 'pipe', 'pipe'],
    }
  );

  serverProcess.stdout?.on('data', (msg: Buffer) => {
    // eslint-disable-next-line no-console
    console.log(SERVER_LOG_PREFIX, msg.toString().trim());
  });
  serverProcess.stderr?.on('data', (msg: Buffer) =>
    console.error(SERVER_LOG_PREFIX, msg.toString().trim())
  );

  /**
   * Start watch server & proxy it's stdout/stderr to current console
   * Also start files regeneration on change
   *
   */

  if (!env.HOT_RELOAD) return;

  const { sendReloadSignal } = runManual({
    port: env.HOT_RELOAD_PORT,
    https: env.HTTPS_BY_NODE,
    watchPaths: [paths.build],
  });

  sendReload = sendReloadSignal;
}

let serverContext: BuildContext;
let clientContext: BuildContext;

Promise.resolve()
  .then(() =>
    compareEnvFiles({
      paths: [
        path.resolve(paths.root, '.env'),
        path.resolve(paths.root, 'example.dev.env'),
        path.resolve(paths.root, 'example.prod.env'),
      ],
      parsedEnvKeys: Object.keys(env),
    })
  )
  .then(makeTxtFiles)
  .then(() =>
    generateFiles({
      configs: generatorConfigs,
      timeLogs: env.LOGS_GENERATION_DETAILS,
      timeLogsOverall: true,
      fileModificationLogs: true,
      watch:
        env.START_SERVER_AFTER_BUILD && env.HOT_RELOAD
          ? {
              paths: [paths.source],
              changedFilesLogs: true,
              aggregationTimeout: env.GENERATOR_AGGREGATION_TIMEOUT,
              onFinish: () => {
                makeTxtFiles();

                void Promise.all([
                  logBuildTime({ name: 'server' }, serverContext.rebuild),
                  logBuildTime({ name: 'client' }, clientContext.rebuild),
                ]).then(() => {
                  sendReload?.();
                });
              },
            }
          : undefined,
    })
  )
  .then(() => {
    fs.rmSync(paths.build, { recursive: true, force: true });
    fs.mkdirSync(paths.build);
    fsExtra.copySync(path.resolve(paths.source, 'templates'), paths.build, { overwrite: true });
  })
  .then(() =>
    Promise.all([
      logBuildTime({ name: 'server' }, async () => {
        // eslint-disable-next-line no-restricted-syntax
        serverContext = await esbuild.context(configServer);
        // eslint-disable-next-line no-restricted-syntax
        await serverContext.rebuild();
      }),
      logBuildTime({ name: 'client' }, async () => {
        // eslint-disable-next-line no-restricted-syntax
        clientContext = await esbuild.context(configClient);
        // eslint-disable-next-line no-restricted-syntax
        await clientContext.rebuild();
      }),
    ])
  )
  .then(afterFirstBuild)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

if (env.START_SERVER_AFTER_BUILD) {
  process.on('exit', () => {
    if (serverProcess) serverProcess.close();
    if (reloadServerProcess) reloadServerProcess.close();

    void serverContext?.dispose();
    void clientContext?.dispose();
  });

  process.on('SIGINT', () => process.exit(0));
  process.on('SIGTERM', () => process.exit(0));
}
