import { stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { FilePathStats } from '../../types';
import { InternalFilePathStatsEntry } from './internal-file-path-stats';

export async function toFilePathStatsAsync(
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

export function isAtFinalDepth(
  depthLimit: number | undefined,
  ancestors: readonly string[],
): boolean {
  return (
    depthLimit !== undefined &&
    depthLimit > 0 &&
    ancestors.length + 1 >= depthLimit
  );
}
