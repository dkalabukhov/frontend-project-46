import _ from 'lodash';

function buildAST(obj1, obj2) {
  const obj1Keys = _.keys(obj1);
  const obj2Keys = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const children = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }

    if (!_.has(obj2, key)) {
      return {
        type: 'removed',
        key,
        value: obj1[key],
      };
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'unchanged',
        key,
        value: obj1[key],
      };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAST(obj1[key], obj2[key]),
      };
    }

    return {
      type: 'changed',
      key,
      value1: obj1[key],
      value2: obj2[key],
    };
  });

  return children;
}

const getDifferenceTree = (obj1, obj2) => ({
  type: 'root',
  children: buildAST(obj1, obj2),
});

export default getDifferenceTree;
