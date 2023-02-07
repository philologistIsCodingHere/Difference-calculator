import getStylish from './stylish.js';
import getPlain from './plain.js';

const formats = {
  stylish: getStylish,
  plain: getPlain,
  json: JSON.stringify,
};

export default formats;
