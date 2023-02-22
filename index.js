import getContent from './src/parser.js';
import formats from './src/formatters/index.js';
import getDiff from './src/getdifference.js';

const gendiff = (path1, path2, format = 'stylish') => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return formats(diff, format);
};

export default gendiff;
