/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import getDate from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

test('gendiff', () => {
  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');
  const ymlFile1 = getFixturePath('file1.yml');
  const ymlFile2 = getFixturePath('file2.yml');
  const expected = readFileSync(getFixturePath('expectedFile.txt'), 'utf-8');
  expect(getDate(jsonFile1, jsonFile2)).toEqual(expected);
  expect(getDate(ymlFile1, ymlFile2)).toEqual(expected);
});
