export type TypeFieldValidator = {
  message: string;
  notValidCheck: (params: { value: any }) => boolean;
};

export const fieldValidators = {
  emptyString: {
    notValidCheck: ({ value }: { value: string }) => value === '',
    message: 'Field should not be empty',
  } as TypeFieldValidator,
};
