import { AxiosError } from 'axios';
import { request as requestRaw } from 'dk-request';
import { TypeCreateContextParams } from 'dk-react-mobx-globals';

import { env } from 'env';

export const request: TypeCreateContextParams['request'] = (params) => {
  const host = IS_CLIENT ? window.SERVER_CONFIG.API_HOST : env.API_HOST;

  const headers = Object.assign(
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer lXBbA5A6Tjsc8unArazTU0PjO0g1+VyuPpzVtoE5rJQ=',
    },
    params.headers
  );

  return requestRaw({
    ...params,
    headers,
    disableCredentials: false,
    url: (requestParams: any) => {
      if (typeof params.url === 'function') return host + params.url(requestParams);

      return host + params.url;
    },
    extraneousLogger: ({ extraneousPaths }) => {
      console.warn(`Omitted extraneous ${JSON.stringify(extraneousPaths)} for "${params.apiName}"`);
    },
    afterRequestInterceptor: () => {
      return Promise.resolve();
    },
  }).catch((error: Error | AxiosError) => {
    throw error;
  });
};
