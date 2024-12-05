declare module '*.scss' {
  const content: Record<string, string>;
  // eslint-disable-next-line import/no-default-export,import/no-unused-modules
  export default content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.txt';

declare const IS_CLIENT: boolean;
declare const PATH_SEP: string;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/naming-convention
interface Console {
  js: (...args: Array<unknown>) => void;
  jsf: (...args: Array<unknown>) => void;
}
