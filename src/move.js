// @flow

import fs from 'fs-extra';
import {validate, createMovePaths, type MoveOptions, type PathMap} from './options';

export async function move(options: MoveOptions): Promise<void> {
  const pathMap = createMovePaths(await validate(options));
  await movePaths(pathMap);
}

export async function movePaths(pathMap: PathMap): Promise<void> {
  await Promise.all(
    Object.entries(pathMap)
      .map(([sourcePath, targetPath]) => fs.move(sourcePath, targetPath))
  );
}
