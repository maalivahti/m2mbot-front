export default function convertDetailDataToTree(data, label, header, descr = '') {
  return data.map((el) => {
    if (Array.isArray(descr)) {
      return {
        label: el[label],
        count: el[descr[0]],
        vol: el[descr[1]],
        header,
      };
    }
    return { label: el[label], count: el[descr], header };
  });
}
