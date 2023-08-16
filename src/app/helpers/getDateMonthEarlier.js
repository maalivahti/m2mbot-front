export default function getDateMonthEarlier() {
  const earlierDate = new Date();

  return earlierDate.setMonth(earlierDate.getMonth() - 1);
}
