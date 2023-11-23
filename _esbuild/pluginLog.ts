import { Plugin } from 'esbuild';
import chalk from 'chalk';

export const pluginLog = (params: { name: string; watch: boolean }): Plugin => ({
  name: 'esbuild-plugin-log',
  setup(build) {
    const LOG_PREFIX = chalk.green('[ESBUILD]');
    let time: number;

    build.onStart(() => {
      if (time !== 0) {
        // eslint-disable-next-line no-console
        console.log(
          `${LOG_PREFIX} Started ${params.watch ? 'watching' : 'building'} ${chalk.yellow(
            params.name
          )}`
        );
      }

      time = performance.now();
    });

    build.onEnd(() => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const buildTime = ((performance.now() - time) / 1000).toFixed(3);

      // eslint-disable-next-line no-console
      console.log(
        `${LOG_PREFIX} finished building ${chalk.yellow(params.name)} within ${chalk.yellow(
          buildTime
        )} seconds`
      );

      time = 0;
    });
  },
});
