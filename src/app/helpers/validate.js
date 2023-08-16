function isString(string) {
  return typeof string === 'string';
}

export function isNotEmptyStringValidate(string) {
  return isString(string) && string.length > 0;
}

export function itemLinkValidator({ label, link, target }) {
  return [isNotEmptyStringValidate(label), isNotEmptyStringValidate(link), isNotEmptyStringValidate(target)].every(Boolean);
}
