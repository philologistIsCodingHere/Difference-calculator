import _ from 'lodash';

const INDENT = '  ';
const ADDED = '+ ';
const REMOVED = '- ';
const UNCHANGED = '  ';
const LINE_BREAK = '\n';
const NESTED = '  ';
const START_DEPTH = 1;
const STEP = 2;

const getValue = (value, depth) => {
  const startIndents = INDENT.repeat(depth + STEP);
  const endIndents = INDENT.repeat(depth + START_DEPTH);
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = [];
    keys.map((key) => result.push(
      `${startIndents}${UNCHANGED}${key}: `,
      `${getValue(value[key], depth + STEP)}${LINE_BREAK}`,
    ));
    return `{${LINE_BREAK}${result.join('')}${endIndents}}`;
  }
  return value;
};

const getNode = (key, node, depth) => {
  const startIndents = INDENT.repeat(depth);
  const endIndents = INDENT.repeat(depth + START_DEPTH);
  const result = [];
  const [type, value] = [node.typeValue, node.valueItem];
  if (type === 'added') {
    result.push(`${startIndents}${ADDED}${key}: ${getValue(value, depth)}`);
  }
  if (type === 'removed') {
    result.push(`${startIndents}${REMOVED}${key}: ${getValue(value, depth)}`);
  }
  if (type === 'changed') {
    const [value1, value2] = value;
    result.push(`${startIndents}${REMOVED}${key}: ${getValue(value1, depth)}`);
    result.push(`${startIndents}${ADDED}${key}: ${getValue(value2, depth)}`);
  }
  if (type === 'unchanged') {
    result.push(`${startIndents}${UNCHANGED}${key}: ${getValue(value, depth)}`);
  }
  if (type === 'nested') {
    result.push(`${startIndents}${NESTED}${key}: {`);
    const keys = Object.keys(value);
    const nodesString = keys.map((item) => getNode(item, value[item], depth + STEP));
    result.push(`${nodesString.join(LINE_BREAK)}\n${endIndents}}`);
  }
  return result.join(LINE_BREAK);
};

const getStylish = (tree) => {
  const keys = Object.keys(tree);
  const nodes = keys.map((key) => getNode(key, tree[key], START_DEPTH));
  return `{${LINE_BREAK}${nodes.join(LINE_BREAK)}${LINE_BREAK}}`;
};

export default getStylish;
