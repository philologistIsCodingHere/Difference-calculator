import _ from 'lodash';

const INDENT = '  ';
const ADDED = '+ ';
const DELETED = '- ';
const UNCHANGED = '  ';
const LINE_BREAK = '\n';

const getDiff = (obj1, obj2) => {
  let result;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  unionKeys.sort();
  const content = unionKeys.map((key) =>{
    const [value1, value2] = [obj1[key], obj2[key]];
    if (keys1.includes(key) && !keys2.includes(key)) {
      result = `${INDENT}${DELETED}${key}: ${value1}`;
    }
    if (keys2.includes(key) && !keys1.includes(key)) {
      result = `${INDENT}${ADDED}${key}: ${value2}`;
    }
    if (keys1.includes(key) && keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        result = `${INDENT}${UNCHANGED}${key}: ${value1}`;
      } else {
        result = `${INDENT}${DELETED}${key}: ${value1}${LINE_BREAK}${INDENT}${ADDED}${key}: ${value2}`;
      }
    }
    return result;
  })
  return `{${LINE_BREAK}${content.join(LINE_BREAK)}${LINE_BREAK}}`;
};

export default getDiff;