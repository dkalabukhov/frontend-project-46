import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const getExtension = (filePath) => path.extname(filePath);

const getName = (filePath) => path.basename(filePath);

function parser(filePath) {
  const fileName = getName(filePath);
  const extension = getExtension(fileName).slice(1);

  return extension !== 'json'
    ? yaml.load(readFileSync(filePath, 'utf-8'))
    : JSON.parse(readFileSync(filePath, 'utf-8'));
}

export default parser;
