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

#### Find

- [`findFileSystemEntriesAsync`](#findfilesystementriesasync) - Searches a directory for files.

### Sync

#### Basic File Operations

- [`readTextSync`](#readtextsync) - Synchronously reads the entire contents of a text file.
- [`writeTextSync`](#writetextsync) - Synchronously writes text to a file.
- [`readBinarySync`](#readbinarysync) - Synchronously reads the entire contents of a binary file into a `Buffer`.
- [`writeBinarySync`](#writebinarysync) - Synchronously writes binary data to a file.
- [`createFileSync`](#createfilesync) - Synchronously creates a file.
- [`existsSync`](#existssync) - Synchronously checks if a file exists.

#### Find

- [`findFileSystemEntriesSync`](#findfilesystementriessync) - Synchronously searches a directory for files.

### Observable

#### Find

- [`fromFindFsEntries`](#fromfindfsentries) - Creates an observable of results of file search for a given directory.

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

#### Find

#### `findFileSystemEntriesAsync`

Searches a directory for files. Search can be limited by depth.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns a `Promise<readonly FilePathStats[]>`.

```ts
async function printFilePaths(): Promise<void> {
  const files = await findFileSystemEntriesAsync(
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

#### Find

#### `findFileSystemEntriesSync`

Synchronously searches a directory for files. Search can be limited by depth.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns a `readonly FilePathStats[]`.

```ts
function printFilePaths(): void {
  const files = findFileSystemEntriesSync(
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

Creates an observable of results of file search for a given directory.

Accepts a `directory` parameter and an optional `options` parameter of type [`FindOptions`](#findoptions), returns an `Observable<FilePathStats>`.

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

Information about a file.

```ts
interface FilePathStats {
  readonly path: string;
  readonly stats: Stats; // Node.js fs.Stats
}
```

#### `FindOptions`

Input options when searching for files:

- `depthLimit: number | undefined`
  - The maximum depth to search.
  - Default is `undefined`.
  - If value is `-1` or `undefined`, there is no depth limit (limit is inifnite).

```ts
interface FindOptions {
  readonly depthLimit?: number | undefined;
}
```
