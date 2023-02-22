import _ from 'lodash';

const LINE_BREAK = '\n';

const stringify = (value) => {
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
  newPath.filter((item) => !!item.length).join(LINE_BREAK);
  const result = [];
  switch (type) {
    case 'added':
      return [...result, `Property '${newPath.join('.')}' was added with value: ${stringify(value)}`];
    case 'removed':
      return [...result, `Property '${newPath.join('.')}' was removed`];
    case 'changed':
      return [...result, `Property '${newPath.join('.')}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`];
    case 'nested':
      return [...result, value.flatMap((item) => getNode(item, newPath)).join(LINE_BREAK)];
    default:
      return result;
  }
};

const getPlain = (tree) => {
  const plainFormat = tree.flatMap((node) => getNode(node));
  return plainFormat.join(LINE_BREAK);
};

export default getPlain;
