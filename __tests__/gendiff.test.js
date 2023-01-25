/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import { readFileSync } from 'fs';
import getDate from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('gendiff', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('expectedFile.txt'), 'utf-8');
  expect(getDate(file1, file2)).toEqual(expected);
});
