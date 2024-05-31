import fs from 'fs-extra';
import { ENCODING_UTF8 } from '../constants';

export function readTextSync(path: string): string {
  return fs.readFileSync(path, ENCODING_UTF8);
}

export function writeTextSync(path: string, content: string): void {
  fs.writeFileSync(path, content, ENCODING_UTF8);
}

export function readBinarySync(path: string): Buffer {
  return fs.readFileSync(path);
}

export function writeBinarySync(path: string, content: Buffer): void {
  fs.writeFileSync(path, content);
}

export function createFileSync(path: string): void {
  fs.createFileSync(path);
}

export function existsSync(path: string): boolean {
  return fs.pathExistsSync(path);
}
