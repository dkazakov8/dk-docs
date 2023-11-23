import { TypeApiRoute } from '../models/system/TypeApiRoute';

type TypeRequest = {};

type TypeResponse = {};

type TypeError = {};

export const sample: TypeApiRoute & {
  error: TypeError;
  request: TypeRequest;
  response: TypeResponse;
} = {
  url: `/api`,
  method: 'POST',
  error: {} as TypeError,
  request: {} as TypeRequest,
  response: {} as TypeResponse,
};
