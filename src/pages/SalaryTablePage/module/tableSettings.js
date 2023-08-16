import { date } from 'quasar';

export const salaryListThead = [
  {
    name: 'reason_display',
    label: 'Основание',
    field: (val) => (val),
    align: 'left',
    headerStyle: 'width: 20%',
  },
  {
    name: 'date',
    label: 'Дата',
    field: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    align: 'left',
    headerStyle: 'width: 12.5%',
  },
  {
    name: 'position',
    label: 'Остаток',
    field: (val) => (val),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Начислено',
    field: function test(val, row) {
      let sum = null;
      // eslint-disable-next-line
      if (row[this.name].includes('add_')) sum = row.sum;
      return sum;
    },
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Удержано',
    field: function test(val, row) {
      let sum = null;
      // eslint-disable-next-line
      if (row[this.name].includes('ded_')) sum = row.sum;
      return sum;
    },
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Выдано',
    field: function test(val, row) {
      let sum = null;
      // eslint-disable-next-line
      if (row[this.name].includes('iss_')) sum = row.sum;
      return sum;
    },
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'position',
    label: 'К выдаче',
    field: (val) => (val),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'responsible',
    label: 'Ответственный',
    field: (val) => (val),
    align: 'left',
    headerStyle: 'width: 9.75%',
  },
  {
    name: 'commentary',
    label: 'Комментарий',
    field: (val) => (val),
    align: 'left',
    headerStyle: 'width: 22.5%',
  },
  {
    name: 'year_and_month',
    label: 'Период',
    field: (val) => `${date.formatDate(val, 'MMMM YYYY')}`,
    align: 'left',
    headerStyle: 'width: 6%',
  },
];

function getSummRemains(staff) {
  return Math.round(staff.ost);
}

function getDedSumm(transactions) {
  return transactions.filter((trans) => trans.reason.includes('ded'))
    .reduce((acc, val) => acc + val.sum, 0);
}

function getIssSumm(transactions) {
  return transactions.filter((trans) => trans.reason.includes('iss'))
    .reduce((acc, val) => acc + val.sum, 0);
}

function getAddSumm(transactions) {
  const addBankSumm = transactions.filter((trans) => (['add_of_wage', 'add_of_wage_north', 'add_of_wage_coff'].includes(trans.reason)))
    .reduce((acc, val) => acc + val.sum, 0);
  const dedBankSumm = transactions.filter((trans) => trans.reason.includes('ded_ndfl')).reduce((acc, val) => acc + val.sum, 0);
  const bankSumm = transactions.some((trans) => trans.reason.includes('add_salary')) ? (addBankSumm - dedBankSumm) : 0;
  const addSumm = transactions.filter((trans) => trans.reason.includes('add')).reduce((acc, val) => acc + val.sum, 0);
  return Math.round(addSumm - bankSumm);
}

function getToIssueSumm(transactions, staff) {
  return Math.round((getSummRemains(staff) + getAddSumm(transactions) - getDedSumm(transactions) - getIssSumm(transactions)));
}

export const salarySummaryListThead = [
  {
    name: 'name',
    label: 'Имя',
    field: (trans, staff) => (staff.full_name),
    align: 'left',
    headerStyle: 'width: 20%',
  },
  {
    name: 'department',
    label: 'Департамент',
    field: (trans, staff) => (staff.position),
    align: 'left',
    headerStyle: 'width: 12.5%',
  },
  {
    name: 'remains',
    label: 'Остаток',
    field: (trans, staff) => getSummRemains(staff),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Начислено',
    field: (trans, staff) => (trans ? getAddSumm(trans, staff) : ''),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Удержано',
    field: (trans) => (trans ? getDedSumm(trans) : ''),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'reason',
    label: 'Выдано',
    field: (trans) => (trans ? getIssSumm(trans) : ''),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'position',
    label: 'К выдаче',
    field: (trans, staff) => (trans ? getToIssueSumm(trans, staff) : ''),
    align: 'left',
    headerStyle: 'width: 6.25%',
  },
  {
    name: 'responsible',
    label: 'Ответственный',
    field: () => '',
    align: 'left',
    headerStyle: 'width: 9.75%',
  },
  {
    name: 'commentary',
    label: 'Комментарий',
    field: () => '',
    align: 'left',
    headerStyle: 'width: 22.5%',
  },
  {
    name: 'year_and_month',
    label: 'Период',
    field: (trans) => (trans ? `${date.formatDate(trans[0].year_and_month, 'MMMM YYYY')}` : ''),
    align: 'left',
    headerStyle: 'width: 6%',
  },
];
