export function parsingJSON(response) {
  const data = {};
  const keys = Object.keys(response);
  keys.forEach((key) => {
    data[`${key}`] = JSON.parse(response[`${key}`]);
  });
  return data;
}
