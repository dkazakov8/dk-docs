import path from 'path';
import fs from 'fs';

import fsExtra from 'fs-extra';

import { paths } from '../paths';

export function makeTextFiles() {
  const files = [
    // New

    path.resolve(paths.source, 'pages/install/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/install/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/install/examples/ExampleBasic.tsx'),

    path.resolve(paths.source, 'pages/textInput/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/TextAntd.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/TextMantine.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/ExampleRegularAllCases.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/ExampleAntdAllCases.tsx'),
    path.resolve(paths.source, 'pages/textInput/examples/ExampleMantineAllCases.tsx'),

    path.resolve(paths.source, 'pages/submit/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/submit/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/submit/examples/Submit.tsx'),
    path.resolve(paths.source, 'pages/submit/examples/ExampleSubmit.tsx'),

    // Old

    path.resolve(paths.models, 'form/TypeFieldValidator.ts'),
    path.resolve(paths.models, 'form/TypeFormConfig.ts'),
    path.resolve(paths.utils, 'form/fieldValidators.ts'),
    path.resolve(paths.source, 'comp/form/Form.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/Submit.tsx'),
    path.resolve(paths.models, 'form/TypeInputSubmitConfig.ts'),

    path.resolve(paths.source, 'comp/form/inputs/Text.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextConfig.ts'),

    path.resolve(paths.source, 'comp/form/inputs/TextAntd.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextAntdConfig.ts'),

    path.resolve(paths.source, 'comp/form/inputs/TextMantine.tsx'),
    path.resolve(paths.models, 'form/TypeInputTextMantineConfig.ts'),

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
