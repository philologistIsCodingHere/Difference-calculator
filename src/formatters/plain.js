import _ from 'lodash';

const LINE_BREAK = '\n';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getNode = (key, node, path = []) => {
  path.push(key);
  const result = [];
  const [type, value] = [node.typeValue, node.valueItem];
  if (type === 'added') {
    result.push(`Property '${path.join('.')}' was added with value: ${getValue(value)}`);
  }
  if (type === 'removed') {
    result.push(`Property '${path.join('.')}' was removed`);
  }
  if (type === 'changed') {
    const [value1, value2] = value;
    result.push(`Property '${path.join('.')}' was updated. From ${getValue(value1)} to ${getValue(value2)}`);
  }
  if (type === 'nested') {
    const keys = Object.keys(value);
    const nodesString = keys.flatMap((item) => getNode(item, value[item], path));
    result.push(nodesString.join(LINE_BREAK));
  }
  path.pop();
  return result;
};

const getPlain = (tree) => {
  const keys = Object.keys(tree);
  const plainFormat = keys.flatMap((key) => getNode(key, tree[key]));
  return plainFormat.join(LINE_BREAK);
};

export default getPlain;
