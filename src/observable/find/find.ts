import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path/posix';
import { Observable } from 'rxjs';
import { FindOptions, FilePathStats } from '../../types';
import { filterEntries } from './filter';
import { sortEntries } from './sort';
import { InternalFilePathStatsEntry } from './internal-file-path-stats';

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
      toFilePathStats(fullDirPath, relativeDirPath, fsName),
    ),
  );

  const filtered = filterEntries(pathStatsEntries, options.filter);
  const sorted = sortEntries(filtered, options.sort);

  const isFinalDepth =
    depthLimit !== undefined &&
    depthLimit > 0 &&
    ancestors.length + 1 >= depthLimit;

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

async function toFilePathStats(
  fullDirPath: string,
  relativeDirPath: string,
  fsName: string,
): Promise<InternalFilePathStatsEntry> {
  const fullFsPath = resolve(fullDirPath, fsName);
  const relativeFsPath = join(relativeDirPath, fsName);
  const stats = await stat(fullFsPath);

  const finalRelativeFsPath = relativeFsPath + (stats.isDirectory() ? '/' : '');
  const fpStats: FilePathStats = { path: finalRelativeFsPath, stats };

  return [fpStats, fsName];
}
