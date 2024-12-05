import path from 'path';
import fs from 'fs';

import fsExtra from 'fs-extra';

import { paths } from '../paths';

function addFilesFromFolder(p: string) {
  return fs.readdirSync(p).map((fileName) => path.join(p, fileName));
}

export function makeTextFiles() {
  const files = [
    ...addFilesFromFolder(path.resolve(paths.source, 'pages/install/examples')),
    ...addFilesFromFolder(path.resolve(paths.source, 'pages/textInput/examples')),
    ...addFilesFromFolder(path.resolve(paths.source, 'pages/submit/examples')),
    ...addFilesFromFolder(path.resolve(paths.source, 'pages/formConfigure/examples')),
    path.resolve(paths.utils, 'fieldValidators.ts'),
  ];

  files.forEach((p) => {
    const content = fs
      .readFileSync(p, 'utf-8')
      .replace('/* eslint-disable */\n', '')
      .replace('// @ts-nocheck\n', '');

    fsExtra.outputFileSync(
      path.resolve(paths.source, 'txt', path.relative(paths.source, p).replace(/\.tsx?/, '.txt')),
      content
    );
  });
}
