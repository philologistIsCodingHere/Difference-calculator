import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import getDiff from './getdifference.js';
import formats from './formatters/index.js';

const getDate = (path1, path2, format = 'stylish') => {
  let result;
  const [cwd1, cwd2] = [process.cwd(path1), process.cwd(path2)];
  const absolutePath1 = path.resolve(cwd1, path1);
  const absolutePath2 = path.resolve(cwd2, path2);
  const fileContent1 = readFileSync(absolutePath1);
  const fileContent2 = readFileSync(absolutePath2);
  if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
    result = getDiff(JSON.parse(fileContent1), JSON.parse(fileContent2));
  } else if (path.extname(path1) === ('.yml' || '.yaml') && path.extname(path2) === ('.yml' || '.yaml')) {
    result = getDiff(yaml.load(fileContent1), yaml.load(fileContent2));
  }
  return formats[format](result);
};

export default getDate;
