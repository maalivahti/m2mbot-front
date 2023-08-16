export function sortingTransByStaff(transList) {
  const sortingTransList = {};
  const staffListUniqueId = new Set(transList.map((trans) => (trans.new_staff)));

  staffListUniqueId.forEach((staff) => {
    sortingTransList[staff] = transList.filter((trans) => trans.new_staff === staff);
  });

  return sortingTransList;
}
