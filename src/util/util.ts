import { Options } from 'klaw';
import { FindOptions } from '../types';

export function toKlawFindOptions(options: FindOptions | undefined): Options {
  if (!options) {
    return {};
  }

  return {
    depthLimit: options.depthLimit,
  };
}
