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

const getNode = (node, depth) => {
  const startIndents = INDENT.repeat(depth);
  const endIndents = INDENT.repeat(depth + START_DEPTH);
  const result = [];
  const { key, type, value } = node;
  if (type === 'added') {
    return [...result, `${startIndents}${ADDED}${key}: ${getValue(value, depth)}`];
  }
  if (type === 'removed') {
    return [...result, `${startIndents}${REMOVED}${key}: ${getValue(value, depth)}`];
  }
  if (type === 'changed') {
    const [value1, value2] = value;
    const resVal1 = [...result, `${startIndents}${REMOVED}${key}: ${getValue(value1, depth)}`];
    const resVal2 = [...result, `${startIndents}${ADDED}${key}: ${getValue(value2, depth)}`];
    return `${resVal1}${LINE_BREAK}${resVal2}`;
  }
  if (type === 'unchanged') {
    return [...result, `${startIndents}${UNCHANGED}${key}: ${getValue(value, depth)}`];
  }
  if (type === 'nested') {
    const startResult = [...result, `${startIndents}${NESTED}${key}: {`];
    const nodesString = value.map((item) => getNode(item, depth + STEP));
    const endResult = [...result, `${nodesString.join(LINE_BREAK)}\n${endIndents}}`];
    return `${startResult}${LINE_BREAK}${endResult}`;
  }
  return result.join(LINE_BREAK);
};

const getStylish = (tree) => {
  const nodes = tree.map((node) => getNode(node, START_DEPTH));
  return `{${LINE_BREAK}${nodes.join(LINE_BREAK)}${LINE_BREAK}}`;
};

export default getStylish;
