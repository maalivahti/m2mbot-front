export default function filterFinancesHistory(rows, contract, operation) {
  return rows.filter((row) => row.contract === contract)
    .filter((row) => (operation === 'all' ? row : row.trans === operation));
}
