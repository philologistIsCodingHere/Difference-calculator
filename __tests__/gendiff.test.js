/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/getdifference.js';

const JSON_FILE_1 = 'file1.json';
const JSON_FILE_2 = 'file2.json';
const YML_FILE_1 = 'file1.yml';
const YML_FILE_2 = 'file2.yml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json files', () => {
  const expectedStylish = readFile('expectedFileStylish.txt');
  const expectedPlain = readFile('expectedFilePlain.txt');
  const expectedJson = readFile('expectedFileJson.txt');
  const [jsonFile1, jsonFile2] = [getFixturePath(JSON_FILE_1), getFixturePath(JSON_FILE_2)];
  expect(gendiff(jsonFile1, jsonFile2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(jsonFile1, jsonFile2, 'json')).toEqual(expectedJson);
});

test('yml files', () => {
  const expectedStylish = readFile('expectedFileStylish.txt');
  const expectedPlain = readFile('expectedFilePlain.txt');
  const expectedJson = readFile('expectedFileJson.txt');
  const [ymlFile1, ymlFile2] = [getFixturePath(YML_FILE_1), getFixturePath(YML_FILE_2)];
  expect(gendiff(ymlFile1, ymlFile2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(ymlFile1, ymlFile2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(ymlFile1, ymlFile2, 'json')).toEqual(expectedJson);
});
