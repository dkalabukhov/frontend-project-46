import makeStylishDiff from './stylish.js';
import makePlainDiff from './plain.js';

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish': {
      return makeStylishDiff(tree);
    }
    case 'plain': {
      return makePlainDiff(tree);
    }
    default: {
      throw new Error('Please enter the correct format');
    }
  }
}
