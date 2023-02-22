import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
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

export default getDiff;
