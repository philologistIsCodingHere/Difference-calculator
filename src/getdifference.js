import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  return unionKeys.map((item) => {
    const result = {
      key: item,
    };
    if (!Object.hasOwn(obj2, item)) {
      result.type = 'removed';
      result.value = obj1[item];
    }
    if (!Object.hasOwn(obj1, item)) {
      result.type = 'added';
      result.value = obj2[item];
    }
    if (Object.hasOwn(obj1, item) && Object.hasOwn(obj2, item)) {
      if (obj1[item] === obj2[item]) {
        result.type = 'unchanged';
        result.value = obj1[item];
      }
      if (obj1[item] !== obj2[item]) {
        result.type = 'changed';
        result.value = [obj1[item], obj2[item]];
      }
    }
    if (_.isObject(obj1[item]) && _.isObject(obj2[item])) {
      result.type = 'nested';
      result.value = getDiff(obj1[item], obj2[item]);
    }
    return result;
  });
};

export default getDiff;
