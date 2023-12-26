import showDiff from '../src/index.js';
import resultStylish from '../__fixtures__/resultStylish.js';

describe('stylish', () => {
  test('json', () => {
    expect(showDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(resultStylish);
  });
  test('yaml', () => {
    expect(showDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml')).toBe(resultStylish);
  });
  test('yml', () => {
    expect(showDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toBe(resultStylish);
  });
});
