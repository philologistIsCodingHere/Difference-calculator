import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import formats from './formatters/index.js';
import getParse from './parser.js';
import buildDiff from './buildDiff.js';

const getContent = (path1, path2) => {
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  const readFile1 = readFileSync(fullPathFile1);
  const readFile2 = readFileSync(fullPathFile2);
  const content1 = getParse((extname(path1).slice(1)), readFile1);
  const content2 = getParse((extname(path2).slice(1)), readFile2);
  return [content1, content2];
};

const gendiff = (path1, path2, format = 'stylish') => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = buildDiff(fileContent1, fileContent2);
  return formats(diff, format);
};

export default gendiff;
