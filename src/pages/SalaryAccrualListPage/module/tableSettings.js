import { date } from 'quasar';

const salaryTransTableSett = [
  {
    name: 'date',
    label: 'Дата',
    align: 'center',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    sortable: true,
    headerStyle: 'width: 15%',
  },
  {
    name: 'staff',
    align: 'left',
    label: 'Сотрудник',
    field: 'new_staff_display',
    sortable: true,
    headerStyle: 'width: 25%',
  },
  {
    name: 'reason',
    align: 'center',
    label: 'Основание',
    field: 'reason_display',
    sortable: true,
    headerStyle: 'width: 15%',
  },
  {
    name: 'sum',
    align: 'center',
    label: 'Сумма',
    field: 'sum',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'period',
    align: 'center',
    label: 'Период',
    field: 'year_and_month',
    format: (val) => `${date.formatDate(val, 'MMMM YYYY')}`,
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'resp',
    align: 'left',
    label: 'Ответственный',
    field: 'new_resp',
    sortable: true,
    headerStyle: 'width: 25%',
  },
];

export default {
  salaryTransTableSett,
};
