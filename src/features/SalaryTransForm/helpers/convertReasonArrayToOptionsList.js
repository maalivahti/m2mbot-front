export function convertReasonArrayToOptionsList(reasonsArray) {
  return reasonsArray.map((reason) => ({ value: reason[0], label: reason[1] }));
}
