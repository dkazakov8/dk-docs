"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.tsx
var import_path2 = __toESM(require("path"));
var import_dk_bff_server = require("dk-bff-server");

// env.ts
var Env = class {
  constructor(params) {
    Object.entries(params).forEach(([envKey, envValue]) => {
      const paramType = typeof this[envKey];
      if (paramType === "boolean") {
        this[envKey] = envValue === true || envValue === "true";
      } else if (paramType === "string") {
        this[envKey] = (envValue || "").replace(/"/g, "").trim();
      } else if (paramType === "number") {
        this[envKey] = Number(envValue || 0);
      }
    });
  }
  GIT_COMMIT = "";
  HOT_RELOAD = false;
  HOT_RELOAD_PORT = 0;
  FILENAME_HASH = false;
  BUNDLE_ANALYZER = false;
  MINIMIZE_CLIENT = false;
  MINIMIZE_SERVER = false;
  GENERATE_COMPRESSED = false;
  BUNDLE_ANALYZER_PORT = 0;
  START_SERVER_AFTER_BUILD = false;
  GENERATOR_AGGREGATION_TIMEOUT = 0;
  NODE_ENV = "development";
  NODE_PATH = "";
  NODE_OPTIONS = "";
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
};
var envInstance = new Env(process.env);
var env = envInstance;

// src/serverUtils/helmetOptions.ts
var self = `'self'`;
var unsafeEval = `'unsafe-eval'`;
var unsafeInline = `'unsafe-inline'`;
var helmetOptions = {
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
        env.HOT_RELOAD ? `localhost:${env.HOT_RELOAD_PORT}` : ""
      ],
      fontSrc: [self, `data:`],
      objectSrc: [self],
      connectSrc: [self, `ws: https://*.sentry.io`, "ws:", "wss:"],
      imgSrc: [self, `data:`, `blob:`],
      frameSrc: [self],
      mediaSrc: [self],
      workerSrc: [self, "blob:"],
      formAction: []
    },
    reportOnly: false
  }
};

// paths.ts
var import_path = __toESM(require("path"));
var root = "";
var source = import_path.default.resolve(root, "src");
var paths = {
  root,
  source,
  sg: import_path.default.resolve(root, "build/sg"),
  stats: import_path.default.resolve(root, "stats"),
  env: import_path.default.resolve(root, "env.ts"),
  build: import_path.default.resolve(root, "build"),
  pages: import_path.default.resolve(source, "pages"),
  paths: import_path.default.resolve(root, "paths.ts"),
  utils: import_path.default.resolve(source, "utils"),
  assets: import_path.default.resolve(source, "assets"),
  styles: import_path.default.resolve(source, "styles"),
  models: import_path.default.resolve(source, "models"),
  themes: import_path.default.resolve(source, "styles/themes.scss"),
  global: import_path.default.resolve(source, "styles/global.scss"),
  package: import_path.default.resolve(root, "package.json"),
  actions: import_path.default.resolve(source, "actions"),
  favicon: import_path.default.resolve(source, "templates/favicon.png"),
  template: import_path.default.resolve(source, "templates/closed.html"),
  validators: import_path.default.resolve(source, "validators"),
  nodeModules: import_path.default.resolve(root, "node_modules"),
  clientEntry: import_path.default.resolve(source, "client.tsx"),
  serverEntry: import_path.default.resolve(root, "server/server.ts"),
  themesObject: import_path.default.resolve(source, "const/themes.tsx")
};

// src/utils/system/isomorphPolyfills.ts
var import_mobx = require("mobx");
var import_dk_react_mobx_globals = require("dk-react-mobx-globals");
function createConsoleJsLogger() {
  console.js = function consoleJsCustom(...args) {
    console.log(...args.map((arg) => (0, import_mobx.toJS)(arg)));
  };
  console.jsf = function consoleJsCustom(...args) {
    if (false) console.log(...args.map((arg) => (0, import_mobx.toJS)(arg)));
  };
}
function replaceOriginalErrorLogger() {
  if (false) {
    window.addEventListener("unhandledrejection", (e) => {
      if (e.reason?.name === import_dk_react_mobx_globals.errorActionCanceledName) {
        e.preventDefault();
        return false;
      }
    });
  }
  const originalErrorLogger = console.error;
  console.error = function consoleErrorCustom(...args) {
    const errorName = args[0]?.name;
    if (errorName === import_dk_react_mobx_globals.errorActionCanceledName) return false;
    return originalErrorLogger(...args);
  };
}
function isomorphPolyfills() {
  (0, import_mobx.configure)({
    enforceActions: "observed",
    disableErrorBoundaries: false,
    computedRequiresReaction: false,
    reactionRequiresObservable: false,
    observableRequiresReaction: false
  });
  createConsoleJsLogger();
  replaceOriginalErrorLogger();
}

// src/server.tsx
process.title = "node: bff-server";
isomorphPolyfills();
void (0, import_dk_bff_server.runServer)({
  port: env.EXPRESS_PORT,
  https: env.HTTPS_BY_NODE,
  templatePath: import_path2.default.resolve(paths.build, "template.html"),
  template500Path: import_path2.default.resolve(paths.build, "error500.html"),
  staticFilesPath: paths.build,
  versionIdentifier: env.GIT_COMMIT,
  compressedFilesGenerated: env.GENERATE_COMPRESSED,
  templateModifier: ({ template, req }) => {
    return Promise.resolve().then(() => {
      const hotReloadUrl = `${env.HTTPS_BY_NODE ? "https" : "http"}://${req.headers.host}:${env.HOT_RELOAD_PORT}`;
      return template.replace(
        "<!-- HOT_RELOAD -->",
        env.HOT_RELOAD ? `<script src="${hotReloadUrl}"></script>` : ""
      );
    });
  },
  injectMeasures: ({ template, measures }) => template.replace("<!-- MEASURES -->", JSON.stringify({ server: measures }, null, 2)),
  helmetOptions
});