# File System

This project contains some helper functions and types for working with the file system.

All functions that handle text files expect the text to be encoded in UTF-8.

## Installation

```bash
npm install --save @gmjs/file-system
```

## API Listing

### Async

#### Basic File Operations

- [`readTextAsync`](#readtextasync) - Reads the entire contents of a text file.
- [`writeTextAsync`](#writetextasync) - Writes text to a file.
- [`readBinaryAsync`](#readbinaryasync) - Reads the entire contents of a binary file into a `Buffer`.
- [`writeBinaryAsync`](#writebinaryasync) - Writes binary data to a file.
- [`createFileAsync`](#createfileasync) - Creates a file.
- [`existsAsync`](#existsasync) - Checks if a file exists.
- [`ensureDirAsync`](#ensuredirasync) - Creates a directory and any necessary parent directories if they do not exist.

#### Find

- [`findFsEntriesAsync`](#findfsentriesasync) - Searches a directory for file system entries, recursively.

### Sync

#### Basic File Operations

- [`readTextSync`](#readtextsync) - Synchronously reads the entire contents of a text file.
- [`writeTextSync`](#writetextsync) - Synchronously writes text to a file.
- [`readBinarySync`](#readbinarysync) - Synchronously reads the entire contents of a binary file into a `Buffer`.
- [`writeBinarySync`](#writebinarysync) - Synchronously writes binary data to a file.
- [`createFileSync`](#createfilesync) - Synchronously creates a file.
- [`existsSync`](#existssync) - Synchronously checks if a file exists.
- [`ensureDirSync`](#ensuredirsync) - Synchronously creates a directory and any necessary parent directories if they do not exist.

#### Find

- [`findFsEntriesSync`](#findfsentriessync) - Synchronously searches a directory for file system entries, recursively.

### Observable

#### Find

- [`fromFindFsEntries`](#fromfindfsentries) - Creates an observable of results of file search for a given directory, recursively.

## API

### Async

#### Basic File Operations

#### `readTextAsync`

Reads the entire contents of a text file.

Accepts a `path` parameter, returns a `Promise<string>`.

```ts
async function printFileContent(): Promise<void> {
  const content = await readTextAsync('path/to/file.txt');
  console.log(content);
}
```

#### `writeTextAsync`

Writes text to a file. Overwrites the file if it already exists.

Accepts `path` and `content` parameters, returns a `Promise<void>`. `content` is a `string`.

```ts
async function writeToFile(): Promise<void> {
  await writeTextAsync('path/to/file.txt', 'Hello, World!');
}
```

#### `readBinaryAsync`

Reads the entire contents of a binary file into a `Buffer`.

Accepts a `path` parameter, returns a `Promise<Buffer>`.

```ts
async function printFileContent(): Promise<void> {
  const content = await readBinaryAsync('path/to/file.bin');
  console.log(content.toString());
}
```

#### `writeBinaryAsync`

Writes binary data to a file. Overwrites the file if it already exists.

Accepts `path` and `content` parameters, returns a `Promise<void>`. `content` is a `Buffer`.

```ts
async function writeToFile(): Promise<void> {
  const content = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
  await writeBinaryAsync('path/to/file.bin', content);
}
```

#### `createFileAsync`

Creates a file. Often used with `writeTextAsync` or `writeBinaryAsync` to ensure that a file and ancestor directories exist before writing to it.

Accepts a `path` parameter, returns a `Promise<void>`.

```ts
async function createFile(): Promise<void> {
  const path = 'path/to/file.txt';
  await createFileAsync(path);
  await writeTextAsync(path, 'Hello, World!');
}
```

#### `existsAsync`

Checks if a file exists.

Accepts a `path` parameter, returns a `Promise<boolean>`.

```ts
async function checkFileExists(): Promise<void> {
  const path = 'path/to/file.txt';
  const exists = await existsAsync(path);
  if (exists) {
    const content = await readTextAsync(path);
    console.log(content);
  } else {
    console.log('File does not exist.');
  }
}
```

#### `ensureDirAsync`

Creates a directory and any necessary parent directories if they do not exist.

Accepts a `path` parameter, returns a `Promise<void>`.

```ts
async function createPathIfNotExists(): Promise<void> {
  await ensureDirAsync('path/to/directory');
}
```

#### Find

#### `findFsEntriesAsync`

Searches a directory for file system entries, recursively. Search can be limited by depth.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns a `Promise<readonly FilePathStats[]>`.

For more details on how the search works, see the [`FindOptions`](#findoptions) section.

```ts
async function printFilePaths(): Promise<void> {
  const files = await findFsEntriesAsync(
    'path/to/directory',
    { depthLimit: 2 },
  );
  for (const file of files) {
    console.log(file.path);
  }
}
```

### Sync

#### Basic File Operations

#### `readTextSync`

Synchronously reads the entire contents of a text file.

Accepts a `path` parameter, returns a `string`.

```ts
function printFileContent(): void {
  const content = readTextSync('path/to/file.txt');
  console.log(content);
}
```

#### `writeTextSync`

Synchronously writes text to a file. Overwrites the file if it already exists.

Accepts `path` and `content` parameters. `content` is a `string`.

```ts
function writeToFile(): void {
  writeTextSync('path/to/file.txt', 'Hello, World!');
}
```

#### `readBinarySync`

Synchronously reads the entire contents of a binary file into a `Buffer`.

Accepts a `path` parameter, returns a `Buffer`.

```ts
function printFileContent(): void {
  const content = readBinarySync('path/to/file.bin');
  console.log(content.toString());
}
```

#### `writeBinarySync`

Synchronously writes binary data to a file. Overwrites the file if it already exists.

Accepts `path` and `content` parameters. `content` is a `Buffer`.

```ts
function writeToFile(): void {
  const content = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
  writeBinarySync('path/to/file.bin', content);
}
```

#### `createFileSync`

Synchronously creates a file. Often used with `writeTextSync` or `writeBinarySync` to ensure that a file and ancestor directories exist before writing to it.

Accepts a `path` parameter.

```ts
function createFile(): void {
  const path = 'path/to/file.txt';
  createFileSync(path);
  writeTextSync(path, 'Hello, World!');
}
```

#### `existsSync`

Synchronously checks if a file exists.

Accepts a `path` parameter, returns a `boolean`.

```ts
function checkFileExists(): void {
  const path = 'path/to/file.txt';
  const exists = existsSync(path);
  if (exists) {
    const content = readTextSync(path);
    console.log(content);
  } else {
    console.log('File does not exist.');
  }
}
```

#### `ensureDirSync`

Synchronouly creates a directory and any necessary parent directories if they do not exist.

Accepts a `path` parameter.

```ts
function createPathIfNotExists(): void {
  ensureDirSync('path/to/directory');
}
```

#### Find

#### `findFsEntriesSync`

Synchronously searches a directory for file system entries, recursivelys. Search can be limited by depth.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns a `readonly FilePathStats[]`.

For more details on how the search works, see the [`FindOptions`](#findoptions) section.

```ts
function printFilePaths(): void {
  const files = findFsEntriesSync(
    'path/to/directory',
    { depthLimit: 2 },
  );
  for (const file of files) {
    console.log(file.path);
  }
}
```

### Observable

#### Find

#### `fromFindFsEntries`

Creates an observable of results of file search for a given directory. Search is recursive.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns an `Observable<FilePathStats>`.

For more details on how the search works, see the [`FindOptions`](#findoptions) section.

```ts
fromFindFsEntries(
  'path/to/directory',
  { depthLimit: 2 },
).subscribe({
  next: (file) => console.log(file.path),
  complete: () => console.log('Search complete.'),
});
```

## Types

### `FilePathStats`

Information about a file. This is the return value of the find functions.

```ts
interface FilePathStats {
  readonly path: string;
  readonly stats: Stats; // Node.js fs.Stats
}
```

`path` contains the file system entry path relative to the root search directory.

`stats` contains the file system stats of the file system entry. This is a Node.js `fs.Stats` object, and will contain information about whether the entry is a file or directory, etc.

If we have the following file structure:

```
- root/
  - file1.txt
  - file2.txt
  - directory1/
    - file3.txt
    - file4.txt
  - directory2/
    - file5.txt
```

And the search root is `root/`, the `FilePathStats` objects for the files will have the following `path` values:

```
file1.txt
file2.txt
directory1/
directory1/file3.txt
directory1/file4.txt
directory2/
directory2/file5.txt
```

Any directory path will be suffixed with a `/` - this can be used to differentiate between files and directories without having to check the `stats` object, and it can be used when speciying sort and filter options.

The search will be done in a **depth-first** manner.

#### `FindOptions`

Input options when searching for files:

- `depthLimit: number | undefined`
  - The maximum depth to search.
  - Default is `undefined`.
  - If value is `0` or `undefined`, there is no depth limit (limit is inifnite).
- `sort: FindSortOptions | undefined` - See [`FindSortOptions`](#findsortoptions).
- `filter: FindFilterOptions | undefined` - See [`FindFilterOptions`](#findfilteroptions).

```ts
export interface FindOptions {
  readonly depthLimit?: number;
  readonly sort?: FindSortOptions;
  readonly filter?: FindFilterOptions;
}
```

#### `FindSortOptions`

**NOTE:** Sorting is done on a per-directory basis, not globally across all files returned by the find function. To sort globally, you can simply implement sorting at the call site, outside of the find function.

Sorting options are a discriminated union of two sorting systems:

- `comparer` - Accepts a custom comparer function.
- `predefined` - Accepts predefined sorting strategies.

##### `comparer`

Completely flexible, allows you to specify any logic in a custom comparer function.

For example, to sort first files, then directories, and each of those by name ascending, you can use the following comparer:

```ts
const comparer: FindSortComparer = (a, b) => {
  if (a.stats.isFile() && b.stats.isDirectory()) {
    return 1;
  }
  if (a.stats.isDirectory() && b.stats.isDirectory()) {
    return -1;
  }
  return a.path.localeCompare(b.path);
};
```

##### `predefined`

Allows the use of predefined sorting strategies.

Two parameters need to be specified:

- `typeOrder: FileSortTypeOrder` - The sort order by file system type (files and directories):
  - `file-first` - Files first, then directories.
  - `directory-first` - Directories first, then files.
  - `none` - No sorting by type, files and directories are mixed.
- `direction: FileSortDirection` - The sort direction of file path:
  - `asc` - Ascending (by file path).
  - `desc` - Descending (by file path).

To achieve the similar sorting as in the `comparer` example above (there are some small differences in how locale compare is done), you can use the following predefined parameters:

```ts
const params: FindSortPredefinedParameters = {
  typeOrder: 'file-first',
  direction: 'asc',
};
```

##### `FindSortOptions` Implemetation

```ts
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

// comparer
export type FindSortComparer = (a: FilePathStats, b: FilePathStats) => number;

// predefined
export interface FindSortPredefinedParameters {
  readonly typeOrder: FileSortTypeOrder;
  readonly direction: FileSortDirection;
}

export type FileSortTypeOrder = 'file-first' | 'directory-first' | 'none';
export type FileSortDirection = 'asc' | 'desc';
```

#### `FindFilterOptions`

**NOTE:** Filtering is done on a per-directory basis, not globally across all files returned by the find function. To filter globally, you can simply implement filtering at the call site, outside of the find function.

##### Caveats

Related to the above - if a directory is filtered out, it will prevent the search from entering that directory. This can be useful for performance reasons, as it can prevent the search from entering large directories that we may want to eventually filter out entirely. Example is a `node_modules` directory in JavaScript or TypeScript projects.

This can cause some unexpected behavior if you are not aware of it.

Lets say we have the following monorepo file structure:

```
- root/
  - package.json
  - libs/
    - lib1/
      // ...
      package.json
    - lib2/
      // ...
      package.json
```

If we want to search for all `package.json` files in the monorepo, we can use the following filter:

```ts
const filter: FindFilterOptions = {
  kind: 'string',
  params: {
    include: [
      { endsWith: '/' }, // make sure that directories are not filtered out
      { endsWith: 'package.json' },
    ],
  },
};
```

It would return the following paths:

```
package.json
libs/
libs/lib1/
libs/lib1/package.json
libs/lib2/
libs/lib2/package.json
```

You could then further filter out the directories at the call site if that is what you wanted.

If you just specified this filter:

```ts
const filter: FindFilterOptions = {
  kind: 'string',
  params: {
    include: [
      { endsWith: 'package.json' },
    ],
  },
};
```

It would just return the root `package.json` file:

```
package.json
```

The reason is that no directory would match `endsWith: 'package.json'`, would be filtered out, and the search would not enter them to find the `package.json` files inside.

##### Description

Filtering options are a discriminated union of three filtering systems:

- `predicate` - Accepts a custom predicate function.
- `string` - Accepts string filtering parameters.
- `regex` - Accepts regex filtering parameters.

##### `predicate`

Completely flexible, allows you to specify any logic in a custom predicate function.

For example, to filter out all files that don't end with `.txt`, you can use the following predicate:

```ts
const predicate: FindFilterPredicate = (entry) => {
  return entry.path.endsWith('.txt');
};
```

##### `string`

**NOTE:** Path used for comparison is the [FilePathStats](#filepathstats) `path` property. This is the path relative from the search root directory. If a file system entry is a directory, the path will end with a `/`.

See `FindFilterStringParameters` below for the structure of the options.

It allows specification of `include` and `exclude` arrays.

Each array can contain multiple `FindFilterStringParametersByType` objects, each of which can contain the following properties:

- `startsWith: string | undefined` - The file path must start with this string.
- `endsWith: string | undefined` - The file path must end with this string.
- `contains: string | undefined` - The file path must contain this string.
- `equals: string | undefined` - The file path must be equal to this string.

If no properties are specified (you pass in an empty array), all files will be included.

If you specify more than one property, all properties must match for the file to be included (`AND` logic is used).

If more than one of the above objects are specified (in the array of `include` or `exclude`), `OR` logic is used between the items (meaning file system entries are included or excluded if they are matched by any filter element in the array).

`include` and `exclude` arrays function the same way except that:

- `include` is used to include files that match the criteria, and `exclude` is used to exclude files that match the criteria (obviously).
- If `include` is not specified, all files are included by default, whereas if `exclude` is not specified, no files are excluded by default.

First any files that match the `include` criteria are included, then any files that match the `exclude` criteria are removed from those included files.

Example:

```
a.txt
a.bin
b.txt
b.bin
c.txt
c.bin
```

```ts
const params: FindFilterStringParameters = {
  include: [
    { startsWith: 'a', endsWith: '.txt' },
    { endsWith: '.bin' },
  ],
  exclude: [
    { startsWith: 'c' },
  ],
};
```

Would return:

```
a.txt
a.bin
b.bin
```

1. First `include` entry would include `a.txt`.
2. Second `include` entry would include `a.bin`, `b.bin`, and `c.bin`.
3. First (and only) `exclude` entry would exclude `c.bin`, and would have excluded `c.txt` if it had previously been included.
4. That leaves `a.txt`, `a.bin`, and `b.bin`.

##### `regex`

Works exactly the same as `string`, but each item in the `include` and `exclude` arrays is a `RegExp` object instead of a `FindFilterStringParametersByType` object.

##### `FindFilterOptions` Implemetation

```ts
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

// predicate
export type FindFilterPredicate = (entry: FilePathStats) => boolean;

// string
export interface FindFilterStringParameters {
  readonly include?: readonly FindFilterStringParametersByType[];
  readonly exclude?: readonly FindFilterStringParametersByType[];
}

export interface FindFilterStringParametersByType {
  readonly startsWith?: string;
  readonly endsWith?: string;
  readonly contains?: string;
  readonly equals?: string;
}

// regex
export interface FindFilterRegexParameters {
  readonly include?: readonly RegExp[];
  readonly exclude?: readonly RegExp[];
}
```
