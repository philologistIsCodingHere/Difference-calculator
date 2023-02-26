import _ from 'lodash';
import getContent from './helper.js';
import formats from './formatters/index.js';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys.map((item) => {
    if (!Object.hasOwn(obj2, item)) {
      return { key: item, type: 'removed', value: obj1[item] };
    }
    if (!Object.hasOwn(obj1, item)) {
      return { key: item, type: 'added', value: obj2[item] };
    }
    if (obj1[item] === obj2[item]) {
      return { key: item, type: 'unchanged', value: obj1[item] };
    }
    if (_.isObject(obj1[item]) && _.isObject(obj2[item])) {
      return { key: item, type: 'nested', value: getDiff(obj1[item], obj2[item]) };
    }
    return { key: item, type: 'changed', value: [obj1[item], obj2[item]] };
  });
};

const gendiff = (path1, path2, format = 'stylish') => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return formats(diff, format);
};

export default gendiff;
