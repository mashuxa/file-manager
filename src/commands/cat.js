import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToFile) => {
  if (!pathToFile) {
    throw new InputError();
  }

  const readableStream = createReadStream(resolve(pathToFile));

  await pipeline(
    readableStream,
    async function (source) {
      source.setEncoding('utf8');
      for await (const chunk of source) {
        console.log(chunk);
      }
    },
  );
};