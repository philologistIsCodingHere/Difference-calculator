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

const getNode = (node, path = []) => {
  const { key, type, value } = node;
  const newPath = [...path, key];
  const result = [];
  if (type === 'added') {
    return [...result, `Property '${newPath.join('.')}' was added with value: ${getValue(value)}`];
  }
  if (type === 'removed') {
    return [...result, `Property '${newPath.join('.')}' was removed`];
  }
  if (type === 'changed') {
    const [value1, value2] = value;
    return [...result, `Property '${newPath.join('.')}' was updated. From ${getValue(value1)} to ${getValue(value2)}`];
  }
  if (type === 'nested') {
    const nodesString = value.flatMap((item) => getNode(item, newPath));
    return [...result, nodesString.join(LINE_BREAK)];
  }
  newPath.filter((item) => !!item.length).join('\n');
  return result;
};

const getPlain = (tree) => {
  const plainFormat = tree.flatMap((node) => getNode(node));
  return plainFormat.join(LINE_BREAK);
};

export default getPlain;
