import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToFile, pathToArchive) => {
  if (!pathToFile || !pathToArchive) {
    throw new InputError();
  }

  const pathToSrcFile = resolve(pathToFile);
  const pathToTargetFile = resolve(pathToArchive);

  await pipeline(createReadStream(pathToSrcFile), createBrotliCompress(), createWriteStream(pathToTargetFile));
};

