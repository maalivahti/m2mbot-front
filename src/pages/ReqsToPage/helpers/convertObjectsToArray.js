export default function convertObjectsToArray(obj) {
  return Array.from(Object.values(obj)).map((el, index) => ({ index: index + 1, car: el[0], comment: el[1] }));
}
