import { lastValueFrom, map, toArray } from 'rxjs';
import { fromFindFsEntries } from '../observable';

async function run(): Promise<void> {
  const dir = '.';
  const files = await lastValueFrom(
    fromFindFsEntries(dir, {
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
    }).pipe(
      map((entry) => entry.path),
      toArray(),
    ),
  );
  console.log(files);
}

run().finally(() => {
  console.log('Done!');
});
