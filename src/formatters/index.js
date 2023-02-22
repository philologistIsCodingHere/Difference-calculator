import getStylish from './stylish.js';
import getPlain from './plain.js';

const formats = (content, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(content);
    case 'plain':
      return getPlain(content);
    case 'json':
      return JSON.stringify(content);
    default:
      throw new Error(`${format} is not found`);
  }
};

export default formats;
