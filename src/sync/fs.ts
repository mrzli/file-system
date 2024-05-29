import fs from 'fs-extra';
import { ENCODING_UTF8 } from '../util';

export function readTextSync(filePath: string): string {
  return fs.readFileSync(filePath, ENCODING_UTF8);
}

export function writeTextSync(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, ENCODING_UTF8);
}

export function readBinarySync(filePath: string): Buffer {
  return fs.readFileSync(filePath);
}

export function writeBinarySync(filePath: string, content: Buffer): void {
  fs.writeFileSync(filePath, content);
}

export function createFileSync(filePath: string): void {
  fs.createFileSync(filePath);
}

export function existsSync(filePath: string): boolean {
  return fs.pathExistsSync(filePath);
}
