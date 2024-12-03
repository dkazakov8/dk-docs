import path from 'path';
import fs from 'fs';

import fsExtra from 'fs-extra';

import { paths } from '../paths';

export function makeTextFiles() {
  const files = [
    // New

    path.resolve(paths.source, 'pages/formGettingStarted/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/formGettingStarted/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/formGettingStarted/examples/ExampleBasic.tsx'),

    path.resolve(paths.source, 'pages/formTextComponent/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/TextAntd.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/TextMantine.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleRegularAllCases.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleAntdAllCases.tsx'),
    path.resolve(paths.source, 'pages/formTextComponent/examples/ExampleMantineAllCases.tsx'),

    path.resolve(paths.source, 'pages/formSubmitComponent/examples/Form.tsx'),
    path.resolve(paths.source, 'pages/formSubmitComponent/examples/Text.tsx'),
    path.resolve(paths.source, 'pages/formSubmitComponent/examples/Submit.tsx'),

    // Old

    path.resolve(paths.models, 'form/TypeFieldValidator.ts'),
    path.resolve(paths.models, 'form/TypeFormConfig.ts'),
    path.resolve(paths.utils, 'form/fieldValidators.ts'),
    path.resolve(paths.source, 'comp/form/Form.tsx'),

    path.resolve(paths.source, 'comp/form/inputs/Submit.tsx'),
    path.resolve(paths.models, 'form/TypeInputSubmitConfig.ts'),
    path.resolve(paths.source, 'pages/formSubmitComponent/examples/ExampleSubmit.tsx'),

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
