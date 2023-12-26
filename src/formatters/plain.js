import _ from 'lodash';

function getFormattedValue(value) {
  switch (typeof value) {
    case 'object': {
      if (Array.isArray(value)) return `${value}`;
      return !value ? 'null' : '[complex value]';
    }
    case 'string': {
      return `'${value}'`;
    }
    default: {
      return `${value}`;
    }
  }
}

const getPath = (nodenames) => nodenames.flat().join('.');

function makePlain(tree) {
  const iter = (node, path) => node.map((child) => {
    const currentPath = getPath([path, child.key]);
    switch (child.type) {
      case 'nested': {
        return iter(child.children, currentPath);
      }
      case 'added': {
        return `Property '${currentPath}' was added with value: ${getFormattedValue(child.value)}`;
      }
      case 'removed': {
        return `Property '${currentPath}' was removed`;
      }
      case 'changed': {
        return `Property '${currentPath}' was updated. From ${getFormattedValue(child.value1)} to ${getFormattedValue(child.value2)}`;
      }
      case 'unchanged': {
        return null;
      }
      default: {
        throw new Error('Uncorrect data');
      }
    }
  });
  return iter(tree.children, []);
}

function makePlainDiff(data) {
  const result = _.flattenDeep(makePlain(data)).filter((element) => element);
  return result.join('\n');
}

export default makePlainDiff;
