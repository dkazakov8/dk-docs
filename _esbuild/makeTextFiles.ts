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
    ...[
      path.resolve(paths.models, 'form/TypeFieldValidator.ts'),
      path.resolve(paths.models, 'form/TypeFormConfig.ts'),
      path.resolve(paths.utils, 'form/fieldValidators.ts'),
      path.resolve(paths.source, 'comp/form/Form.tsx'),

      path.resolve(paths.source, 'comp/form/inputs/Submit.tsx'),
      path.resolve(paths.source, 'comp/form/inputs/Text.tsx'),
      path.resolve(paths.source, 'comp/form/inputs/TextAntd.tsx'),
      path.resolve(paths.source, 'comp/form/inputs/TextMantine.tsx'),

      path.resolve(paths.models, 'form/TypeInputSubmitConfig.ts'),
      path.resolve(paths.models, 'form/TypeInputTextConfig.ts'),
      path.resolve(paths.models, 'form/TypeInputTextAntdConfig.ts'),
      path.resolve(paths.models, 'form/TypeInputTextMantineConfig.ts'),
    ],
  ];

  files.forEach((p) => {
    const content = fs.readFileSync(p, 'utf-8');
    fsExtra.outputFileSync(
      path.resolve(paths.source, 'txt', path.relative(paths.source, p).replace(/\.tsx?/, '.txt')),
      content
    );
  });
}
