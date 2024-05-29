export interface FilePathContent<TContent extends string | Buffer> {
  readonly path: string;
  readonly content: TContent;
}

export type FilePathTextContent = FilePathContent<string>;
export type FilePathBinaryContent = FilePathContent<Buffer>;
