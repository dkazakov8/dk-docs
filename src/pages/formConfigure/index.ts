import { default as store } from './store';
import { default as PageComponent } from './FormConfigure';

export const pageName = __dirname.split(PATH_SEP).pop();

export { store };

// eslint-disable-next-line import/no-default-export
export default PageComponent;
