import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { InputError } from '../InputError.js';

export default async (filename) => {
  if (!filename) {
    throw new InputError();
  }

  writeFile(resolve(filename), '');
};