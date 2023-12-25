import _ from 'lodash';
import path from 'node:path';
import parser from './parsers.js';

function resolvePath(filepath) {
  return path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
}

export default function showDiff(filepath1, filepath2) {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const obj1 = parser(path1);
  const obj2 = parser(path2);

  const data1Keys = _.keys(obj1);
  const data2Keys = _.keys(obj2);

  const keys = _.sortBy(_.union(data1Keys, data2Keys));

  const indent = '  ';

  function stylish(lines) {
    return [
      '{',
      ...lines,
      '}',
    ].join('\n');
  }

  const lines = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `${indent}+ ${key}: ${obj2[key]}`;
    }

    if (!_.has(obj2, key)) {
      return `${indent}- ${key}: ${obj1[key]}`;
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return `${indent}  ${key}: ${obj1[key]}`;
    }

    return `${indent}- ${key}: ${obj1[key]}\n${indent}+ ${key}: ${obj2[key]}`;
  });

  return stylish(lines);
}
