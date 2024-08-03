import { FindSortComparer } from './find-sort-comparer';
import { FindSortPredefinedParameters } from './find-sort-predefined-parameters';

export const LIST_OF_FIND_SORT_OPTIONS_KINDS = [
  'comparer',
  'predefined',
] as const;

export type FindSortOptionsKind =
  (typeof LIST_OF_FIND_SORT_OPTIONS_KINDS)[number];

export interface FindSortOptionsBase {
  readonly kind: FindSortOptionsKind;
}

export interface FindSortOptionsComparer extends FindSortOptionsBase {
  readonly kind: 'comparer';
  readonly comparer: FindSortComparer;
}

export interface FindSortOptionsPredefined extends FindSortOptionsBase {
  readonly kind: 'predefined';
  readonly params: FindSortPredefinedParameters;
}

export type FindSortOptions =
  | FindSortOptionsComparer
  | FindSortOptionsPredefined;
