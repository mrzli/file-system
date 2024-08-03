import {
  FilePathStats,
  FindFilterOptions,
  FindFilterPredicate,
  FindFilterStringParameters,
  FindFilterStringParametersByType,
  FindFilterRegexParameters,
} from '../types';
import { ensureNever } from '../util';
import { InternalFilePathStatsEntry } from './internal-file-path-stats';

export function filterEntries(
  entries: readonly InternalFilePathStatsEntry[],
  options: FindFilterOptions | undefined,
): readonly InternalFilePathStatsEntry[] {
  if (options === undefined) {
    return entries;
  }

  const predicate = getPredicate(options);
  return entries.filter((entry) => predicate(entry[0]));
}

function getPredicate(options: FindFilterOptions): FindFilterPredicate {
  switch (options.kind) {
    case 'predicate': {
      return options.predicate;
    }
    case 'string': {
      return stringParametersToPredicate(options.params);
    }
    case 'regex': {
      return regexParametersToPredicate(options.params);
    }
    default: {
      return ensureNever(options);
    }
  }
}

function stringParametersToPredicate(
  params: FindFilterStringParameters,
): FindFilterPredicate {
  const { include, exclude } = params;

  return (entry: FilePathStats) => {
    const includes =
      include === undefined ||
      include.some((param) => {
        const predicate = stringParametersByTypeToPredicate(param);
        return predicate(entry);
      });

    const excludes =
      exclude !== undefined &&
      exclude.some((param) => {
        const predicate = stringParametersByTypeToPredicate(param);
        return predicate(entry);
      });

    return includes && !excludes;
  };
}

function stringParametersByTypeToPredicate(
  params: FindFilterStringParametersByType,
): FindFilterPredicate {
  const { startsWith, endsWith, contains, equals } = params;

  const startsWithPredicate = (entry: FilePathStats): boolean => {
    return startsWith === undefined || entry.path.startsWith(startsWith);
  };

  const endsWithPredicate = (entry: FilePathStats): boolean => {
    return endsWith === undefined || entry.path.endsWith(endsWith);
  };

  const containsPredicate = (entry: FilePathStats): boolean => {
    return contains === undefined || entry.path.includes(contains);
  };

  const equalsPredicate = (entry: FilePathStats): boolean => {
    return equals === undefined || entry.path === equals;
  };

  return (entry: FilePathStats) => {
    return (
      startsWithPredicate(entry) &&
      endsWithPredicate(entry) &&
      containsPredicate(entry) &&
      equalsPredicate(entry)
    );
  };
}

function regexParametersToPredicate(
  params: FindFilterRegexParameters,
): FindFilterPredicate {
  const { include, exclude } = params;

  return (entry: FilePathStats) => {
    const includes =
      include === undefined || include.some((regex) => regex.test(entry.path));

    const excludes =
      exclude !== undefined && exclude.some((regex) => regex.test(entry.path));

    return includes && !excludes;
  };
}
