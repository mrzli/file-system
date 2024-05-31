import fs from 'fs-extra';
import { ENCODING_UTF8 } from '../constants';

export async function readTextAsync(path: string): Promise<string> {
  return await fs.readFile(path, ENCODING_UTF8);
}

export async function writeTextAsync(
  path: string,
  content: string,
): Promise<void> {
  await fs.writeFile(path, content, ENCODING_UTF8);
}

export async function readBinaryAsync(path: string): Promise<Buffer> {
  return await fs.readFile(path);
}

export async function writeBinaryAsync(
  path: string,
  content: Buffer,
): Promise<void> {
  await fs.writeFile(path, content);
}

export async function createFileAsync(path: string): Promise<void> {
  await fs.createFile(path);
}

export async function existsAsync(path: string): Promise<boolean> {
  return await fs.pathExists(path);
}
