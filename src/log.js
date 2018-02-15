// @flow

import {basename, dirname, extname} from 'path';
import {codeFrameColumns} from '@babel/code-frame';
import debug from 'debug';
import type {Debugger} from 'debug';
import pkg from '../package.json';

function getPackageNameWithoutNamespace(): string {
  return pkg.name.split('/')[1];
}

function niceName(name: string): string {
  const niceName = basename(name, extname(name));
  if (niceName !== 'index') {
    return niceName;
  }
  return basename(dirname(name));
}

export function createDebug(filename: string): Debugger {
  return debug(`${getPackageNameWithoutNamespace()}:${niceName(filename)}`);
}

type File = {
  source: string,
  path: string
};

type LogOptions = {
  file?: File,
  loc?: {start: {line: number, column: number}, end: {line: number, column: number}}
};

function createFrame({file, loc}: LogOptions = {}): string {
  if (!file) {
    return '';
  }
  const frame = codeFrameColumns(file.source, loc, {highlightCode: true});
  return `\nat ${file.path}:\n${frame}`;
}

export function log(msg: string, options?: LogOptions): void {
  console.log(`LOG: ${msg}${createFrame(options)}`);
}

export function warn(msg: string, options?: LogOptions): void {
  console.warn(`WARN: ${msg}${createFrame(options)}`);
}
