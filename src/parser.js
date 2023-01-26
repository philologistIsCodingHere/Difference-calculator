import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import getDiff from './getdifference.js';

const getDate = (path1, path2) => {
  let result;
  const cwd1 = process.cwd(path1);
  const cwd2 = process.cwd(path2);
  const absolutePath1 = path.resolve(cwd1, path1);
  const absolutePath2 = path.resolve(cwd2, path2);
  const readPath1 = readFileSync(absolutePath1);
  const readPath2 = readFileSync(absolutePath2);
  if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
    result = getDiff(JSON.parse(readPath1), JSON.parse(readPath2));
  } else if (path.extname(path1) === ('.yml' || '.yaml') && path.extname(path2) === ('.yml' || '.yaml')) {
    result = getDiff(yaml.load(readPath1), yaml.load(readPath2));
  }
  return result;
};

export default getDate;
