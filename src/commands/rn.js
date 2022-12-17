import { rename } from 'fs/promises';
import { parse, resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToFile, newFileName) => {
  if (!pathToFile || !newFileName) {
    throw new InputError();
  }

  const { dir } = parse(pathToFile);

  await rename(resolve(pathToFile), resolve(dir, newFileName));
};