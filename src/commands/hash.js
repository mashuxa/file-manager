import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToFile) => {
  if (!pathToFile) {
    throw new InputError();
  }

  const content = await readFile(resolve(pathToFile));
  const data = createHash('sha256').update(content);

  console.log(data.digest('hex'));
};