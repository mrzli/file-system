import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  filterEntries,
  sortEntries,
  isAtFinalDepth,
  toFilePathStatsSync,
} from '../shared';
import { FindOptions, FilePathStats } from '../types';

export function findFsEntriesSync(
  directory: string,
  options?: FindOptions,
): readonly FilePathStats[] {
  const finalOptions: FindOptions = options ?? {};
  return findDirEntriesDeep(directory, [], finalOptions);
}

function findDirEntriesDeep(
  root: string,
  ancestors: readonly string[],
  options: FindOptions,
): readonly FilePathStats[] {
  const { depthLimit } = options;

  const relativeDirPath = ancestors.join('/');
  const fullDirPath = resolve(root, relativeDirPath);
  const dirEntries = readdirSync(fullDirPath);
  const pathStatsEntries = dirEntries.map((fsName) =>
    toFilePathStatsSync(fullDirPath, relativeDirPath, fsName),
  );

  const filtered = filterEntries(pathStatsEntries, options.filter);
  const sorted = sortEntries(filtered, options.sort);

  const isFinalDepth = isAtFinalDepth(depthLimit, ancestors);

  const entries: FilePathStats[] = [];

  for (const entry of sorted) {
    entries.push(entry[0]);

    if (!isFinalDepth && entry[0].stats.isDirectory()) {
      const childEntries = findDirEntriesDeep(
        root,
        [...ancestors, entry[1]],
        options,
      );

      entries.push(...childEntries);
    }
  }

  return entries;
}
