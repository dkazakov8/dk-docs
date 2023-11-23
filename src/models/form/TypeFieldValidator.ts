export type TypeFieldValidator = {
  message: string;
  notValidCheck: (params: { value: any }) => boolean;
};
