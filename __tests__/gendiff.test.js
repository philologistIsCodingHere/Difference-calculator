/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const [jsonFile1, jsonFile2] = [getFixturePath('file1.json'), getFixturePath('file2.json')];
const [ymlFile1, ymlFile2] = [getFixturePath('file1.yml'), getFixturePath('file2.yml')];

test('stylish format', () => {
  const expectedStylish = readFile('expectedFileStylish.txt');
  expect(gendiff(jsonFile1, jsonFile2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(ymlFile1, ymlFile2, 'stylish')).toEqual(expectedStylish);
});

test('plain format', () => {
  const expectedPlain = readFile('expectedFilePlain.txt');
  expect(gendiff(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(ymlFile1, ymlFile2, 'plain')).toEqual(expectedPlain);
});

test('json format', () => {
  expect(() => JSON.parse(gendiff(jsonFile1, jsonFile2, 'json'))).not.toThrow();
  expect(() => JSON.parse(gendiff(ymlFile1, ymlFile2, 'json'))).not.toThrow();
});
