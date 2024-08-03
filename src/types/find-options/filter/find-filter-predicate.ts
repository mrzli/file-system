import { FilePathStats } from '../../file-path-stats';

export type FindFilterPredicate = (entry: FilePathStats) => boolean;
