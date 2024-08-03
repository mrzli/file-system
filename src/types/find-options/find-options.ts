import { FindFilterOptions } from './filter';
import { FindSortOptions } from './sort';

export interface FindOptions {
  readonly depthLimit?: number;
  readonly sort?: FindSortOptions;
  readonly filter?: FindFilterOptions;
}
