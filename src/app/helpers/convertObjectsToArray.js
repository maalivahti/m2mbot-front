export default function convertObjectsToArray(data, labelField, valueField) {
  return data.map((obj) => ({ value: parseInt(obj[valueField], 10), label: obj[labelField] }));
}
