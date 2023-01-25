import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import getDiff from './getdifference.js';

const getDate = (path1, path2) => {
  const cwd1 = process.cwd(path1);
  const cwd2 = process.cwd(path2);
  const absolutePath1 = path.resolve(cwd1, path1);
  const absolutePath2 = path.resolve(cwd2, path2);
  const readPath1 = readFileSync(absolutePath1);
  const readPath2 = readFileSync(absolutePath2);
  const result = getDiff(JSON.parse(readPath1), JSON.parse(readPath2));
  return result;
};

export default getDate;
