import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import getParse from './parser.js';

export default (path1, path2) => {
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  const readFile1 = readFileSync(fullPathFile1);
  const readFile2 = readFileSync(fullPathFile2);
  const content1 = getParse(extname(path1), readFile1);
  const content2 = getParse(extname(path2), readFile2);
  return [content1, content2];
};
