import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';

const parseJSONFiles = (path1, path2) => {
  const fileContent1 = JSON.parse(path1);
  const fileContent2 = JSON.parse(path2);
  return [fileContent1, fileContent2];
};

const parseYAMLFiles = (path1, path2) => {
  const fileContent1 = load(path1);
  const fileContent2 = load(path2);
  return [fileContent1, fileContent2];
};

export default (path1, path2) => {
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  const readFile1 = readFileSync(fullPathFile1);
  const readFile2 = readFileSync(fullPathFile2);
  const FORMATS = {
    '.yml': parseYAMLFiles,
    '.yaml': parseYAMLFiles,
    '.json': parseJSONFiles,
  };
  return FORMATS[extname(path1)](readFile1, readFile2);
};
