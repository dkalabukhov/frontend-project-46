/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const resolvePath = (filePath) => (filePath.includes('__fixtures__')
  ? path.resolve(process.cwd(), filePath)
  : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const gendiff = (filepath1, filepath2) => {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = JSON.parse(readFileSync(path1, 'utf-8'));
  const data2 = JSON.parse(readFileSync(path2, 'utf-8'));

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const result = ['{'];
  for (const key of keys) {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`    ${key}: ${data2[key]}`);
      } else if (data1[key] !== data2[key]) {
        result.push(`  - ${key}: ${data1[key]}`);
        result.push(`  + ${key}: ${data2[key]}`);
      }
    }
  }
  result.push('}');
  return result.join('\n');
};

export default gendiff;
