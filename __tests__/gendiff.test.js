/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import getDate from '../src/parser.js';

const JSON_FILE_1 = 'file1.json';
const JSON_FILE_2 = 'file2.json';
const YML_FILE_1 = 'file1.yml';
const YML_FILE_2 = 'file2.yml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const expectedStylish = readFile('expectedFileStylish.txt');
  const expectedPlain = readFile('expectedFilePlain.txt');
  const [jsonFile1, jsonFile2] = [getFixturePath(JSON_FILE_1), getFixturePath(JSON_FILE_2)];
  expect(getDate(jsonFile1, jsonFile2, 'stylish')).toEqual(expectedStylish);
  expect(getDate(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
});

test('yml', () => {
  const expectedStylish = readFile('expectedFileStylish.txt');
  const expectedPlain = readFile('expectedFilePlain.txt');
  const [ymlFile1, ymlFile2] = [getFixturePath(YML_FILE_1), getFixturePath(YML_FILE_2)];
  expect(getDate(ymlFile1, ymlFile2, 'stylish')).toEqual(expectedStylish);
  expect(getDate(ymlFile1, ymlFile2, 'plain')).toEqual(expectedPlain);
});
