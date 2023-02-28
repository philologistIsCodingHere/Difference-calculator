import { load } from 'js-yaml';

const getParse = (format, content) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
      return load(content);
    case 'yml':
      return load(content);
    default:
      throw new Error(`${format} is not found`);
  }
};

export default getParse;
