import fs, { Stats } from 'fs';
import path from 'path';

import { values } from 'lodash';
import { TypeMessage } from 'dk-localize';

import { paths } from '../paths';
import { languages } from '../src/const';
import { TypeLanguage } from '../src/models';

const walkSync = (dir: string, callback: (filePath?: string, stats?: Stats) => void) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile()) {
      callback(filepath, stats);
    }
  });
};

function getFromFiles({
  rootPath,
}: {
  rootPath: string;
}): Promise<Record<string, { defaultValue: string }>> {
  const filePaths: Array<string> = [];

  walkSync(rootPath, (filePath) => {
    if (filePath?.endsWith('messages.ts'))
      filePaths.push(`../${path.relative(path.resolve(rootPath, '../'), filePath)}`);
  });

  const translationsByFiles: Record<string, { defaultValue: string }> = {};

  return Promise.all(
    filePaths.map((filePath) => {
      return import(filePath).then(({ messages }: { messages: Record<string, TypeMessage> }) => {
        values(messages).forEach(({ name, defaultValue }) => {
          translationsByFiles[path.relative(path.resolve(__dirname, '../'), name)] = {
            defaultValue,
          };
        });
      });
    })
  ).then(() => translationsByFiles);
}

function translate({ from, to, text }: { from: 'en'; to: TypeLanguage; text: string }) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(
    text
  )}`;

  return fetch(url)
    .then((data) => data.json())
    .then((data) => data[0][0][0]);
}

export function updateTranslations() {
  return Promise.resolve()
    .then(() => getFromFiles({ rootPath: paths.source }))
    .then((defaultTranslations) => {
      return import('../src/translations.json').then((translationsFromDb) => ({
        defaultTranslations,
        translationsFromDb,
      }));
    })
    .then(({ defaultTranslations, translationsFromDb }) => {
      // Set new keys & update all default values
      return Promise.all(
        Object.entries(defaultTranslations).map(([key, value]) => {
          // @ts-ignore
          translationsFromDb[key] = translationsFromDb[key] || value;
          // @ts-ignore
          translationsFromDb[key].defaultValue = value.defaultValue;

          return Promise.all(
            languages
              .filter((lang) => lang !== 'en')
              .map((lang) => {
                // @ts-ignore
                if (!translationsFromDb[key][lang]) {
                  return translate({ from: 'en', to: lang, text: value.defaultValue }).then(
                    (translatedValue) => {
                      // eslint-disable-next-line no-console
                      console.log(`${key}: translated to [${lang}]:`, translatedValue);
                      // @ts-ignore
                      translationsFromDb[key][lang] = translatedValue;
                    }
                  );
                }

                return Promise.resolve();
              })
          );
        })
      ).then(() => ({ defaultTranslations, translationsFromDb }));
    })
    .then(({ defaultTranslations, translationsFromDb }) => {
      // Remove obsolete translations
      Object.keys(translationsFromDb).forEach((key) => {
        if (!defaultTranslations[key]) {
          // @ts-ignore
          delete translationsFromDb[key];
        }
      });

      // Order by key
      const orderedTranslations = {};
      Object.keys(translationsFromDb)
        .sort((a, b) => a.localeCompare(b))
        // @ts-ignore
        .forEach((key) => (orderedTranslations[key] = translationsFromDb[key]));

      return orderedTranslations;
    })
    .then((orderedTranslations) => {
      return fs.promises.writeFile(
        path.resolve('./src/translations.json'),
        JSON.stringify(orderedTranslations, null, 2)
      );
    });
}
