/* eslint-disable @typescript-eslint/no-unused-vars */
import { lastValueFrom, map, toArray } from 'rxjs';
import { fromFindFsEntries } from '../observable';
import { FindOptions } from '../types';
import { findFsEntriesAsync } from '../async';
import { findFsEntriesSync } from '../sync';

async function run(): Promise<void> {
  const dir =
    'C:\\Users\\Mrzli\\Development\\Projects\\private\\projects\\js\\trading\\gm-trading\\';
  const options: FindOptions = {
    depthLimit: undefined,
    filter: {
      kind: 'string',
      params: {
        include: [
          {
            startsWith: 'apps/',
            endsWith: '/',
          },
          {
            startsWith: 'libs/',
            endsWith: '/',
          },
          {
            endsWith: 'package.json',
          },
        ],
        exclude: [
          {
            endsWith: '.git/',
          },
          {
            endsWith: 'node_modules/',
          },
          {
            endsWith: 'dist/',
          },
          {
            equals: 'package.json',
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

  await asyncExample(dir, options);
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
  const files = entries
    .map((entry) => entry.path)
    .filter((path) => path.endsWith('package.json'));
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
