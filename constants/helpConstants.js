export function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, current) {
    let key = current[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(current);
    return acc;
  }, {});
};