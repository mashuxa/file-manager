import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToArchive, pathToFile) => {
  if (!pathToArchive || !pathToFile) {
    throw new InputError();
  }

  const pathToSrcFile = resolve(pathToArchive);
  const pathToTargetFile = resolve(pathToFile)

  await pipeline(createReadStream(pathToSrcFile), createBrotliDecompress(), createWriteStream(pathToTargetFile));
};

