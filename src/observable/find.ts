import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path/posix';
import { Observable } from 'rxjs';
import { FindOptions, FilePathStats } from '../types';
import {
  filterEntries,
  isAtFinalDepth,
  sortEntries,
  toFilePathStatsAsync,
} from '../shared';

export function fromFindFsEntries(
  directory: string,
  options?: FindOptions,
): Observable<FilePathStats> {
  return new Observable<FilePathStats>((subscriber) => {
    const finalOptions: FindOptions = options ?? {};

    const handleEntry = (entry: FilePathStats): void => {
      subscriber.next(entry);
    };

    async function execute(): Promise<void> {
      try {
        await enumerateDirEntriesDeep(directory, [], finalOptions, handleEntry);
      } catch (error) {
        subscriber.error(error);
        return;
      }

      subscriber.complete();
    }

    execute();
  });
}

async function enumerateDirEntriesDeep(
  root: string,
  ancestors: readonly string[],
  options: FindOptions,
  onEnumerateEntry: (entry: FilePathStats) => void,
): Promise<void> {
  const { depthLimit } = options;

  const relativeDirPath = ancestors.join('/');
  const fullDirPath = resolve(root, relativeDirPath);
  const dirEntries = await readdir(fullDirPath);
  const pathStatsEntries = await Promise.all(
    dirEntries.map((fsName) =>
      toFilePathStatsAsync(fullDirPath, relativeDirPath, fsName),
    ),
  );

  const filtered = filterEntries(pathStatsEntries, options.filter);
  const sorted = sortEntries(filtered, options.sort);

  const isFinalDepth = isAtFinalDepth(depthLimit, ancestors);

  for (const entry of sorted) {
    onEnumerateEntry(entry[0]);

    if (!isFinalDepth && entry[0].stats.isDirectory()) {
      await enumerateDirEntriesDeep(
        root,
        [...ancestors, entry[1]],
        options,
        onEnumerateEntry,
      );
    }
  }
}
