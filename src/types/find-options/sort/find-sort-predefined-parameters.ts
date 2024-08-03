import { FileSortTypeOrder, FileSortDirection } from './enums';

export interface FindSortPredefinedParameters {
  readonly typeOrder: FileSortTypeOrder;
  readonly direction: FileSortDirection;
}
