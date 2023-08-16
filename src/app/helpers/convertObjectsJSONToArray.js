export default function convertObjectsJSONToArray(data, labelField, valueField) {
  return JSON.parse(data)
    .map((obj) => ({ value: obj[valueField], label: obj[labelField] }));
}
