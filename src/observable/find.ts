import { Observable } from 'rxjs';
import klaw from 'klaw';
import { FindOptions, FilePathStats } from '../types';
import { toKlawAsyncFindOptions } from '../util';

export function fromFindFsEntries(
  directory: string,
  options?: FindOptions,
): Observable<FilePathStats> {
  return new Observable<FilePathStats>((subscriber) => {
    const finalOptions = toKlawAsyncFindOptions(options);

    klaw(directory, finalOptions)
      .on('data', (item) => {
        subscriber.next(item);
      })
      .on('error', (error) => {
        subscriber.error(error);
      })
      .on('end', () => {
        subscriber.complete();
      });
  });
}
