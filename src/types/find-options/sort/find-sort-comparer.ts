import { FilePathStats } from '../../file-path-stats';

export type FindSortComparer = (a: FilePathStats, b: FilePathStats) => number;
