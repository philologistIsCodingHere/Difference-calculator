import _ from 'lodash';
import getContent from './parser.js';
import formats from './formatters/index.js';

const getDiff = (obj1, obj2) => {
  const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys.map((item) => {
    const [value1, value2] = [obj1[item], obj2[item]];
    if (keys1.includes(item) && !keys2.includes(item)) {
      return { key: item, type: 'removed', value: value1 };
    }
    if (keys2.includes(item) && !keys1.includes(item)) {
      return { key: item, type: 'added', value: value2 };
    }
    if (value1 === value2) {
      return { key: item, type: 'unchanged', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key: item, type: 'nested', value: getDiff(value1, value2) };
    }
    return { key: item, type: 'changed', value: [value1, value2] };
  });
};

const gendiff = (path1, path2, format) => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return formats[format](diff);
};

export default gendiff;
