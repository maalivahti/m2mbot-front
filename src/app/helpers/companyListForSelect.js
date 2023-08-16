export default function companyListForSelect(companyArray, withAll) {
  const selectItems = companyArray.map((company) => (
    {
      value: company.id,
      label: company.company_name ? company.company_name : company.name,
    }
  ));
  if (withAll) selectItems.unshift({ value: 'all', label: 'Все доступные' });
  return selectItems;
}
