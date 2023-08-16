import { date } from 'quasar';

const financeTableHead = [
  {
    name: 'date',
    required: true,
    label: 'Дата',
    align: 'center',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'operation',
    align: 'center',
    label: 'Вид операции',
    field: 'type_trans',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'sum',
    align: 'center',
    label: 'Сумма операции',
    field: 'sum',
    format: (val, row) => {
      if (['inv', 'inc_corr', 'corr', 'inv_r'].includes(row.trans)) return `-${val} ₽`;
      return `${val} ₽`;
    },
    sortable: true,
    classes: (row) => {
      // Выделение цветом суммы операции
      if (['inv', 'inc_corr', 'corr', 'inv_r'].includes(row.trans)) return 'text-red-10';
      return 'text-green';
    },
    headerStyle: 'width: 11%',
  },
  {
    name: 'reason',
    align: 'left',
    label: 'Назначение операции',
    field: 'reason',
    headerStyle: 'width: 45%',
    classes: 'table__col-wrap',
  },
  {
    name: 'contract',
    align: 'center',
    label: 'Договор',
    field: 'contract',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'company',
    align: 'left',
    label: 'Компания',
    field: 'company',
    sortable: true,
    headerStyle: 'width: 15%',
  },
];

const financesStoryTableHead = [
  {
    name: 'date',
    label: 'Дата',
    align: 'center',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    // sortable: true,
    style: 'width: 10%',
  },
  {
    name: 'sum',
    align: 'center',
    label: 'Сумма операции',
    field: 'sum',
    format: (val, row) => {
      if (['inv', 'inc_corr', 'corr', 'inv_r'].includes(row.trans)) return `-${val} ₽`;
      return `${val} ₽`;
    },
    classes: (row) => {
      // Выделение цветом суммы операции
      if (['inv', 'inc_corr', 'corr', 'inv_r'].includes(row.trans)) return 'text-red-10';
      return 'text-green';
    },
    style: 'width: 15%',
  },
  {
    name: 'beforeIcon',
    classes: 'table__col-wrap',
  },
  {
    name: 'icon',
  },
];

const actListTableHead = [
  {
    name: 'company',
    align: 'left',
    label: 'Компания',
    field: 'client',
    sortable: true,
    headerStyle: 'width: 35%',
  },
  {
    name: 'organisation',
    align: 'left',
    label: 'Организация',
    field: 'organisation',
    sortable: true,
    headerStyle: 'width: 35%',
  },
  {
    name: 'period',
    align: 'left',
    label: 'Период',
    format: (val, row) => (`${date.formatDate(row.p_start, 'DD.MM.YYYY')} - ${date.formatDate(row.p_end, 'DD.MM.YYYY')}`),
    sortable: true,
    headerStyle: 'width: 20%',
  },
  {
    name: 'icon',
  },
];

const operationList = [
  { label: 'Всё операции', value: 'all' },
  { label: 'Оплата', value: 'inc' },
  { label: 'Возврат', value: 'inc_corr' },
  { label: 'Обещанный платеж', value: 'inc_pp' },
  { label: 'Счет по акту', value: 'inv' },
  { label: 'Счет по реализации', value: 'inv_r' },
  { label: 'Корректировка', value: 'corr' },
  { label: 'Задолженность', value: 'corr_debt' },
];

export default {
  financeTableHead,
  financesStoryTableHead,
  operationList,
  actListTableHead,
};
