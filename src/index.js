/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const obj1 = JSON.parse(readFileSync(path1, 'utf-8'));
  const obj2 = JSON.parse(readFileSync(path2, 'utf-8'));
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const uniqKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const resultObject = uniqKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc[key] = obj1[key];
      } else {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
      }
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc[`+ ${key}`] = obj2[key];
    }

    return acc;
  }, {});

  let result = '';
  result += '{ \n';
  const objectEntries = Object.entries(resultObject);
  for (const [key, value] of objectEntries) {
    result += `  ${key}: ${value} \n`;
  }
  result += '}';

  return result;
};

export default gendiff;
