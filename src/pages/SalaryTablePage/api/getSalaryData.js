import getData from 'src/app/api/getData';
import { sortingTransByStaff } from '../helpers/sortingTransByStaff';

function filteringDepartmentList(depList, staffList) {
  const parentDepsArray = Array.from(new Set(depList.map((dep) => (dep.parent_id))));
  const staffDepsArray = Array.from(new Set(staffList.map((dep) => (dep.dep_id))));
  return depList.filter((dep) => parentDepsArray.includes(dep.id) || staffDepsArray.includes(dep.id));
}

export async function getSalaryData(depList, staffList, transList, sortingTransList, mainDepList, period) {
  getData('/salary/get_salary_list', { period })
    .then((data) => {
      depList.value = filteringDepartmentList(JSON.parse(data.department_list), JSON.parse(data.staff_list))
        .map((dep) => ({ ...dep, expand: false }));

      staffList.value = JSON.parse(data.staff_list).map((staff) => {
        const fullName = `${staff.last_name} ${staff.first_name} ${staff.second_name}`;
        const salaryRemains = data.salary_ost[staff.id];
        return {
          ...staff,
          full_name: fullName,
          ost: salaryRemains,
          expand: false,
        };
      });

      transList.value = JSON.parse(data.trans_list);
      sortingTransList.value = sortingTransByStaff(JSON.parse(data.trans_list));
      mainDepList.value = depList.value.filter((dep) => dep.parent_id === 1);
    });
}
