/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formatsTests = ['json', 'yaml', 'yml'];

test.each(formatsTests)('gendiff for all formats', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  const stylishResult = readFile('expectedFileStylish.txt');
  const plainResult = readFile('expectedFilePlain.txt');
  const data = gendiff(filepath1, filepath2, 'json');
  expect(gendiff(filepath1, filepath2)).toEqual(stylishResult);
  expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
  expect(() => JSON.parse(data)).not.toThrow();
});
