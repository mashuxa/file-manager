import { rm } from 'fs/promises';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (pathToFile) => {
  if (!pathToFile) {
    throw new InputError();
  }

  await rm(resolve(pathToFile));
};