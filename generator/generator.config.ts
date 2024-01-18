import fs from 'fs';
import path from 'path';

import { TypeGenerateFilesParams } from 'dk-file-generator';
import { TypeProcessParamsReexport } from 'dk-file-generator/dist/src/plugins/reexport/types';

import { paths } from '../paths';

const headerTemplate = `/* eslint-disable */\n// This file is auto-generated\n\n`;

type TypeReexportConfig = TypeProcessParamsReexport['config'];

const defaultReexportConfig: Omit<TypeReexportConfig[number], 'folder'> = {
  importTemplate: ({ fileNameNoExt }) => `export * from './${fileNameNoExt}';\n`,
  fileNameTemplate: ({ folderName }) => `_${folderName}.ts`,
  includeChildrenMask: /^((?!messages\.ts|\.scss).)*$/,
};

const reexportPagesActions: TypeReexportConfig = fs
  .readdirSync(paths.pages)
  .reduce((acc, pageFolder) => {
    const actionsFilePath = path.resolve(paths.pages, pageFolder, 'actions');

    if (fs.existsSync(actionsFilePath) && fs.lstatSync(actionsFilePath).isDirectory()) {
      acc.push({ folder: actionsFilePath, ...defaultReexportConfig });
    }

    return acc;
  }, [] as TypeReexportConfig);

function createReexportConfig({
  includeRoot,
  folderPath,
}: {
  includeRoot: boolean;
  folderPath: string;
}): TypeReexportConfig {
  const config: TypeProcessParamsReexport['config'] = [];

  if (includeRoot) {
    config.push({ folder: folderPath, ...defaultReexportConfig });
  }

  fs.readdirSync(folderPath).forEach((fName) => {
    const filePath = path.resolve(folderPath, fName);

    if (fs.lstatSync(filePath).isDirectory()) {
      config.unshift({ folder: filePath, ...defaultReexportConfig });
    }
  });

  return config;
}

export const generatorConfigs: TypeGenerateFilesParams['configs'] = [
  {
    plugin: 'theme',
    config: [
      {
        file: paths.themes,
        targetFile: paths.themesObject,
        exportTemplate: ({ targetFileNameNoExt, themes }) =>
          `${headerTemplate}export const ${targetFileNameNoExt} = ${JSON.stringify(
            themes,
            null,
            2
          )}`,
      },
    ],
  },
  {
    plugin: 'reexport-modular',
    config: [
      {
        folder: paths.pages,
        targetFile: path.resolve(paths.source, 'modularActions.ts'),
        childFileOrFolderName: 'actions',
        exportTemplate: ({ subFoldersOfFiles }) =>
          `\nexport { ${subFoldersOfFiles.map(({ moduleName }) => moduleName).join(', ')} };\n`,
        importTemplate: ({ moduleName, relativePath }) =>
          `import * as ${moduleName} from './${relativePath}';\n`,
      },
      {
        folder: paths.pages,
        targetFile: path.resolve(paths.source, 'modularStores.ts'),
        childFileOrFolderName: 'store.ts',
        exportTemplate: ({ subFoldersOfFiles }) =>
          `\nexport { ${subFoldersOfFiles.map(({ moduleName }) => moduleName).join(', ')} };\n`,
        importTemplate: ({ moduleName, relativePath }) =>
          `import ${moduleName} from './${relativePath}';\n`,
      },
    ],
  },
  {
    plugin: 'reexport',
    config: [
      ...reexportPagesActions,
      ...createReexportConfig({
        folderPath: paths.actions,
        includeRoot: false,
      }),
      ...createReexportConfig({
        folderPath: paths.utils,
        includeRoot: true,
      }),
      ...createReexportConfig({
        folderPath: paths.models,
        includeRoot: true,
      }),
      {
        folder: path.resolve(paths.source, 'actions'),
        ...defaultReexportConfig,
        importTemplate: ({ fileNameNoExt }) =>
          `import * as ${fileNameNoExt} from './${fileNameNoExt}';\n`,
        exportTemplate: ({ fileNamesNoExt }) =>
          `\nexport default { ${fileNamesNoExt.join(', ')} }\n`,
      },
      {
        folder: path.resolve(paths.assets, 'icons'),
        ...defaultReexportConfig,
        importTemplate: ({ fileNameNoExt, fileName }) =>
          `import ${fileNameNoExt} from './${fileName}';\n`,
        exportTemplate: ({ fileNamesNoExt, folderName }) =>
          `\nexport const ${folderName} = { ${fileNamesNoExt.join(', ')} }\n`,
      },
      {
        folder: path.resolve(paths.assets, 'images'),
        ...defaultReexportConfig,
        importTemplate: ({ fileNameNoExt, fileName }) =>
          `import ${fileNameNoExt} from './${fileName}';\n`,
        exportTemplate: ({ fileNamesNoExt, folderName }) =>
          `\nexport const ${folderName} = { ${fileNamesNoExt.join(', ')} }\n`,
      },
      {
        folder: path.resolve(paths.source, 'const'),
        ...defaultReexportConfig,
      },
      {
        folder: path.resolve(paths.source, 'stores'),
        ...defaultReexportConfig,
        importTemplate: ({ fileNameNoExt }) =>
          `export { default as ${fileNameNoExt} } from './${fileNameNoExt}';\n`,
      },
    ],
  },
];
