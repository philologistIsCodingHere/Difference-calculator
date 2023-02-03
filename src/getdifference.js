import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
  const unionKeys = _.union(keys1, keys2);
  unionKeys.sort();
  return unionKeys.reduce((acc, key) => {
    let type;
    let value;
    const [value1, value2] = [obj1[key], obj2[key]];
    if (keys1.includes(key) && !keys2.includes(key)) {
      type = 'removed';
      value = value1;
    }
    if (keys2.includes(key) && !keys1.includes(key)) {
      type = 'added';
      value = value2;
    }
    if (keys1.includes(key) && keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        type = 'unchanged';
        value = value1;
      } else {
        type = 'changed';
        value = [value1, value2];
      }
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      type = 'nested';
      value = getDiff(value1, value2);
    }
    acc[key] = {
      typeValue: type,
      valueItem: value,
    };
    return acc;
  }, {});
};

export default getDiff;
