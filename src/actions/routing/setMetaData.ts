import { TypeAction, TypeMetaData } from 'models';

type TypeParams = TypeMetaData;

export const setMetaData: TypeAction<TypeParams> = ({ store }, params) => {
  const { title, description, titleParams, descriptionParams } = params;

  store.ui.metaData = {
    title,
    titleParams,
    description,
    descriptionParams,
  };

  return Promise.resolve();
};
