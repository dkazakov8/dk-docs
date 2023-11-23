import { TypeMessage } from 'dk-localize';

export type TypeMetaData = {
  title?: TypeMessage;
  titleParams?: Record<string, any>;
  description?: TypeMessage;
  descriptionParams?: Record<string, any>;
};
