class Env {
  constructor(params: Env) {
    Object.entries(params).forEach(([envKey, envValue]) => {
      // @ts-ignore
      const paramType = typeof this[envKey];

      if (paramType === 'boolean') {
        // @ts-ignore
        this[envKey] = envValue === true || envValue === 'true';
      } else if (paramType === 'string') {
        // @ts-ignore
        this[envKey] = (envValue || '').replace(/"/g, '').trim();
      } else if (paramType === 'number') {
        // @ts-ignore
        this[envKey] = Number(envValue || 0);
      }
    });
  }

  SENTRY_URL = '';
  SENTRY_ENV = '';
  GIT_COMMIT = '';
  HOT_RELOAD = false;
  HOT_RELOAD_PORT = 0;
  SWC_ENABLED = false;
  POLYFILLING = false;
  FILENAME_HASH = false;
  BUNDLE_ANALYZER = false;
  MINIMIZE_CLIENT = false;
  MINIMIZE_SERVER = false;
  GENERATE_COMPRESSED = false;
  BUNDLE_ANALYZER_PORT = 0;
  START_SERVER_AFTER_BUILD = false;
  GENERATOR_AGGREGATION_TIMEOUT = 0;

  SG_BUILD_ENABLED = false;
  NODE_ENV: 'development' | 'production' = 'development';
  NODE_PATH = '';
  NODE_OPTIONS = '';
  EXPRESS_PORT = 0;
  HTTPS_BY_NODE = false;

  LOGS_MEASURES = false;
  LOGS_STORE_SETTER = false;
  LOGS_WATCHED_FILES = false;
  LOGS_RELOAD_BROWSER = false;
  LOGS_RESTORE_INITIAL = false;
  LOGS_CANCELED_ACTIONS = false;
  LOGS_EXECUTING_ACTIONS = false;
  LOGS_GENERATION_DETAILS = false;
}

/**
 * Global environment params take precedence over .env file
 * for passing vars in Docker image or running in CI
 *
 */

// eslint-disable-next-line no-process-env
const envInstance = new Env(process.env as unknown as Env);

export const env = envInstance;
