import { Stats } from 'node:fs';

export interface FilePathStats {
  readonly path: string;
  readonly stats: Stats;
}
