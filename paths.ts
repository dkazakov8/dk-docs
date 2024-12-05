import path from 'path';

const root = __dirname;
const source = path.resolve(root, 'src');

export const paths = {
  root,
  source,
  env: path.resolve(root, 'env.ts'),
  build: path.resolve(root, 'build'),
  pages: path.resolve(source, 'pages'),
  utils: path.resolve(source, 'utils'),
  assets: path.resolve(source, 'assets'),
  styles: path.resolve(source, 'styles'),
  models: path.resolve(source, 'models'),
  themes: path.resolve(source, 'styles/themes.scss'),
  global: path.resolve(source, 'styles/global.scss'),
  actions: path.resolve(source, 'actions'),
  nodeModules: path.resolve(root, 'node_modules'),
  themesObject: path.resolve(source, 'const/themes.tsx'),
};
