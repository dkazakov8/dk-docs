/** *
 * @docs: https://eslint.org/docs/user-guide/configuring/language-options
 *
 */

const fs = require('fs');
const path = require('path');

const { getEslintConfig } = require('dk-eslint-config');

const eslintConfig = getEslintConfig({
  react: true,
  tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
});

/**
 * eslint-plugin-import considers all imports like 'env' | 'const' as external
 *
 * but for better readability we need to treat them as internal to separate from
 * imports from 'node_modules' folder
 *
 */

const pathGroups = [
  { pattern: 'env', group: 'internal' },
  { pattern: 'paths', group: 'internal' },
];

fs.readdirSync(path.resolve(__dirname, 'src')).forEach((fileName) => {
  const fileNameNoExt = path.parse(fileName).name;

  pathGroups.push({ pattern: fileNameNoExt, group: 'internal' });
  pathGroups.push({ pattern: `${fileNameNoExt}/**`, group: 'internal' });
});

eslintConfig.rules = {
  'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
  'react/no-unused-prop-types': ['off'],
  'react/jsx-no-literals': ['off'],
  'react/no-unescaped-entities': ['off'],
  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index'],
      pathGroups,
      pathGroupsExcludedImportTypes: ['internal'],
    },
  ],
  // 'react/jsx-no-literals': [
  //   'error',
  //   { noStrings: true, ignoreProps: true, noAttributeStrings: true },
  // ],
  // 'import/no-unused-modules': [1, { unusedExports: true }],
};

eslintConfig.overrides.push(
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': ['off'],
    },
  },
  {
    files: ['src/api/*'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        { zones: [{ target: './src/api', from: './src', except: ['models'] }] },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'models',
              message: 'Use specific imports like "../models/SomeModel"',
            },
          ],
          patterns: [
            {
              group: ['models/*', '!../models/*'],
              message: 'Use a relative import for validators generator',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/models/**/*'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        { zones: [{ target: './src/models', from: './src', except: ['models'] }] },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'models',
              message: 'Use specific imports like "../models/SomeModel"',
            },
          ],
          patterns: [
            {
              group: ['models/*', '!../models/*'],
              message: 'Use a relative import',
            },
          ],
        },
      ],
    },
  }
);

module.exports = eslintConfig;
