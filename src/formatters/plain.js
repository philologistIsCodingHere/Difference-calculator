import _ from 'lodash';

const LINE_BREAK = '\n';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const getNode = (node, path = []) => {
  const { key, type, value } = node;
  const newPath = [...path, key];
  newPath.filter((item) => !!item.length).join(LINE_BREAK);
  switch (type) {
    case 'added':
      return `Property '${newPath.join('.')}' was added with value: ${stringify(value)}${LINE_BREAK}`;
    case 'removed':
      return `Property '${newPath.join('.')}' was removed${LINE_BREAK}`;
    case 'changed':
      return `Property '${newPath.join('.')}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}${LINE_BREAK}`;
    case 'nested':
      return `${value.flatMap((item) => getNode(item, newPath)).join('')}`;
    case 'unchanged':
      return '';
    default:
      throw new Error(`${type} is not found`);
  }
};

const getPlain = (tree) => {
  const plainFormat = tree.flatMap((node) => getNode(node));
  return plainFormat.join('').trim();
};

export default getPlain;
