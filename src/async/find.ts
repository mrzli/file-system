import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  filterEntries,
  sortEntries,
  toFilePathStatsAsync,
  isAtFinalDepth,
} from '../shared';
import { FindOptions, FilePathStats } from '../types';

export async function findFsEntriesAsync(
  directory: string,
  options?: FindOptions,
): Promise<readonly FilePathStats[]> {
  const finalOptions: FindOptions = options ?? {};
  return await findDirEntriesDeep(directory, [], finalOptions);
}

async function findDirEntriesDeep(
  root: string,
  ancestors: readonly string[],
  options: FindOptions,
): Promise<readonly FilePathStats[]> {
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

  const entries: FilePathStats[] = [];

  for (const entry of sorted) {
    entries.push(entry[0]);

    if (!isFinalDepth && entry[0].stats.isDirectory()) {
      const childEntries = await findDirEntriesDeep(
        root,
        [...ancestors, entry[1]],
        options,
      );

      entries.push(...childEntries);
    }
  }

  return entries;
}
