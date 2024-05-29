import klaw, { Options } from 'klaw-sync';
import { FindOptions, FilePathStats } from '../types';

export function findFileSystemEntriesSync(
  directory: string,
  options?: FindOptions,
): readonly FilePathStats[] {
  const finalOptions = toKlawFindOptions(options);

  return klaw(directory, finalOptions).map((item) => ({
    path: item.path,
    stats: item.stats,
  }));
}

export function toKlawFindOptions(options: FindOptions | undefined): Options {
  if (!options) {
    return {};
  }

  return {
    depthLimit: options.depthLimit,
  };
}
