import {
  FilePathStats,
  FileSortDirection,
  FileSortTypeOrder,
  FindSortComparer,
  FindSortOptions,
} from '../../types';
import { FindSortPredefinedParameters } from '../../types/find-options/sort/find-sort-predefined-parameters';
import { ensureNever } from '../../util';
import { InternalFilePathStatsEntry } from './internal-file-path-stats';

export function sortEntries(
  entries: readonly InternalFilePathStatsEntry[],
  options: FindSortOptions | undefined,
): readonly InternalFilePathStatsEntry[] {
  if (options === undefined) {
    return entries;
  }

  const comparer = getComparer(options);
  return entries.toSorted((a, b) => comparer(a[0], b[0]));
}

function getComparer(options: FindSortOptions): FindSortComparer {
  switch (options.kind) {
    case 'comparer': {
      return options.comparer;
    }
    case 'predefined': {
      return predefinedParametersToComparer(options.params);
    }
    default: {
      return ensureNever(options);
    }
  }
}

function predefinedParametersToComparer(
  params: FindSortPredefinedParameters,
): FindSortComparer {
  const { typeOrder, direction } = params;

  const typeComparer = getTypeOrderComparer(typeOrder);
  const directionComparer = getDirectionComparer(direction);

  return createCompareByTypeAndDirection(typeComparer, directionComparer);
}

function getTypeOrderComparer(
  typeOrder: FileSortTypeOrder,
): FindSortComparer | undefined {
  switch (typeOrder) {
    case 'file-first': {
      return compareFileFirst;
    }
    case 'directory-first': {
      return compareDirectoryFirst;
    }
    case 'none': {
      return undefined;
    }
    default: {
      return ensureNever(typeOrder);
    }
  }
}

function getDirectionComparer(direction: FileSortDirection): FindSortComparer {
  switch (direction) {
    case 'asc': {
      return comparePathAsc;
    }
    case 'desc': {
      return comparePathDesc;
    }
    default: {
      return ensureNever(direction);
    }
  }
}

function createCompareByTypeAndDirection(
  typeComparer: FindSortComparer | undefined,
  directionComparer: FindSortComparer,
): FindSortComparer {
  if (typeComparer === undefined) {
    return directionComparer;
  }

  return (a: FilePathStats, b: FilePathStats) => {
    const resultType = typeComparer(a, b);
    if (resultType !== 0) {
      return resultType;
    }

    return directionComparer(a, b);
  };
}

function compareFileFirst(a: FilePathStats, b: FilePathStats): number {
  return sign(toFileTypeValue(a) - toFileTypeValue(b));
}

function compareDirectoryFirst(a: FilePathStats, b: FilePathStats): number {
  return sign(toFileTypeValue(b) - toFileTypeValue(a));
}

function comparePathAsc(a: FilePathStats, b: FilePathStats): number {
  return a.path.localeCompare(b.path, 'en-US', { sensitivity: 'base' });
}

function comparePathDesc(a: FilePathStats, b: FilePathStats): number {
  return b.path.localeCompare(a.path, 'en-US', { sensitivity: 'base' });
}

function toFileTypeValue(entry: FilePathStats): number {
  if (entry.stats.isFile()) {
    return 1;
  } else if (entry.stats.isDirectory()) {
    return 2;
  } else {
    return 3;
  }
}

function sign(n: number): number {
  return n < 0 ? -1 : n > 0 ? 1 : 0;
}
