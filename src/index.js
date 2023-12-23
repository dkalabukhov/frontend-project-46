import { readFileSync } from 'node:fs';
import path from 'node:path';

function resolvePath(filepath) {
  return path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
}

export default function showDiff(filepath1, filepath2) {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const obj1 = JSON.parse(readFileSync(path1, 'utf-8'))
  const obj2 = JSON.parse(readFileSync(path2, 'utf-8'))

  return [obj1, obj2];
}