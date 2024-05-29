import { Options } from 'klaw';
import { FindOptions } from '../types';

export function toKlawAsyncFindOptions(
  options: FindOptions | undefined,
): Options {
  if (!options) {
    return {};
  }

  return {
    depthLimit: options.depthLimit,
  };
}
