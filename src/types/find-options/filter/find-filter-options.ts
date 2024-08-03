import { FindFilterPredicate } from './find-filter-predicate';
import { FindFilterRegexParameters } from './find-filter-regex-parameters';
import { FindFilterStringParameters } from './find-filter-string-parameters';

export const LIST_OF_FIND_FILTER_OPTIONS_KINDS = [
  'predicate',
  'string',
  'regex',
] as const;

export type FindFilterOptionsKind =
  (typeof LIST_OF_FIND_FILTER_OPTIONS_KINDS)[number];

export interface FindFilterOptionsBase {
  readonly kind: FindFilterOptionsKind;
}

export interface FindFilterOptionsPredicate extends FindFilterOptionsBase {
  readonly kind: 'predicate';
  readonly predicate: FindFilterPredicate;
}

export interface FindFilterOptionsString extends FindFilterOptionsBase {
  readonly kind: 'string';
  readonly params: FindFilterStringParameters;
}

export interface FindFilterOptionsRegex extends FindFilterOptionsBase {
  readonly kind: 'regex';
  readonly params: FindFilterRegexParameters;
}

export type FindFilterOptions =
  | FindFilterOptionsPredicate
  | FindFilterOptionsString
  | FindFilterOptionsRegex;
