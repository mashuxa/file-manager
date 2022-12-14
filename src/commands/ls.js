import { readdir } from 'fs/promises';
import { parse, resolve } from 'path';
import { sortFileData } from '../utils/utils.js';

export default async () => {
  const filesData = await readdir(resolve('./'), { withFileTypes: true });
  const [directories, files] = filesData.reduce(([directories, files], data) => {
    if(data.isFile()) {
      return [directories, [...files, [data.name, 'file']]];
    }

    return [[...directories, [data.name, 'directory']], files];

    return [[], []];
  }, [[], []]);
  const sortedDirectories = directories.sort(sortFileData);
  const sortedFiles = files.sort(sortFileData);

  console.table([...sortedDirectories, ...sortedFiles]);
};