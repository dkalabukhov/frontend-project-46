import showDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

describe('plainObjects', () => {
  test('json', () => {
    expect(showDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(result);
  });
});
