/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formatsTests = [
  ['json', 'stylish', 'expectedFileStylish'],
  ['yaml', 'stylish', 'expectedFileStylish'],
  ['yml', 'stylish', 'expectedFileStylish'],
  ['json', 'plain', 'expectedFilePlain'],
  ['yaml', 'plain', 'expectedFilePlain'],
  ['yml', 'plain', 'expectedFilePlain'],
  ['json', undefined, 'expectedFileStylish'],
  ['yaml', undefined, 'expectedFileStylish'],
  ['yml', undefined, 'expectedFileStylish'],
];

test.each(formatsTests)('gendiff for all formats', (extension, format, expected) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  const receivedResult = gendiff(filepath1, filepath2, format);
  const expectedResult = readFile(`${expected}.txt`);
  expect(receivedResult).toEqual(expectedResult);
  expect(() => JSON.parse(gendiff(filepath1, filepath2, 'json'))).not.toThrow();
});
