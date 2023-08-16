export function convertContractData(contractList, summ) {
  return contractList.map((contract) => ({
    ...contract,
    summary: summ[contract.id],
  }));
}
