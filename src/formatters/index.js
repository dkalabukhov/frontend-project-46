import makeStylishDiff from './stylish.js';

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish':
      return makeStylishDiff(tree);
    default:
      throw new Error('Please enter the correct format');
  }
}
