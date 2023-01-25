import { program } from 'commander';
import getDate from './parser.js'

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    getDate(filepath1, filepath2);
  });

program.parse();

export default program;