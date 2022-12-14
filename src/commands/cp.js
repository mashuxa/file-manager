import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { InputError } from '../InputError.js';

export default async (pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    throw new InputError();
  }

  const { base } = parse(resolve(pathToFile));
  const readableStream = createReadStream(resolve(pathToFile));
  const writableStream = createWriteStream(resolve(pathToNewDirectory, base));

  await pipeline(readableStream, writableStream);
};