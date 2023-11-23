import { TypeFieldValidator } from 'models';

export const fieldValidators = {
  emptyString: {
    notValidCheck: ({ value }: { value: string }) => value === '',
    message: 'Field should not be empty',
  } as TypeFieldValidator,
};
