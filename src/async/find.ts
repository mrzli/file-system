import klaw from 'klaw';
import { FilePathStats, FindOptions } from '../types';
import { toKlawAsyncFindOptions } from '../util';

export async function findFileSystemEntriesAsync(
  directory: string,
  options?: FindOptions,
): Promise<readonly FilePathStats[]> {
  return new Promise<readonly FilePathStats[]>((resolve, reject) => {
    const finalOptions = toKlawAsyncFindOptions(options);

    const entries: FilePathStats[] = [];
    klaw(directory, finalOptions)
      .on('data', (item) => {
        entries.push({
          path: item.path,
          stats: item.stats,
        });
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        resolve(entries);
      });
  });
}
