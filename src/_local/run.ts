/* eslint-disable @typescript-eslint/no-unused-vars */
import { lastValueFrom, map, toArray } from 'rxjs';
import { fromFindFsEntries } from '../observable';
import { FindOptions } from '../types';
import { findFsEntriesAsync } from '../async';
import { findFsEntriesSync } from '../sync';

async function run(): Promise<void> {
  const dir = '.';
  const options: FindOptions = {
    depthLimit: undefined,
    filter: {
      kind: 'string',
      params: {
        exclude: [
          {
            endsWith: 'node_modules/',
          },
          {
            endsWith: '.git/',
          },
          {
            endsWith: 'dist/',
          },
        ],
      },
    },
    sort: {
      kind: 'predefined',
      params: {
        typeOrder: 'file-first',
        direction: 'asc',
      },
    },
  };

  syncExample(dir, options);
}

async function observableExample(
  dir: string,
  options: FindOptions,
): Promise<void> {
  const files = await lastValueFrom(
    fromFindFsEntries(dir, options).pipe(
      map((entry) => entry.path),
      toArray(),
    ),
  );
  console.log(files);
}

async function asyncExample(dir: string, options: FindOptions): Promise<void> {
  const entries = await findFsEntriesAsync(dir, options);
  const files = entries.map((entry) => entry.path);
  console.log(files);
}

function syncExample(dir: string, options: FindOptions): void {
  const entries = findFsEntriesSync(dir, options);
  const files = entries.map((entry) => entry.path);
  console.log(files);
}

run().finally(() => {
  console.log('Done!');
});
