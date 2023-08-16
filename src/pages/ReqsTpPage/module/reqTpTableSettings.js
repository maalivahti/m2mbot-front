import { date } from 'quasar';

const reqsTableHead = [
  {
    name: 'reqNum',
    required: true,
    label: '№ заявки',
    align: 'center',
    field: 'number',
    format: (val) => (val ? `${val}` : 'Не указан'),
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'reqDate',
    align: 'center',
    label: 'Дата заявки',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'reqCompany',
    align: 'left',
    label: 'Компания',
    field: 'company',
    sortable: true,
    headerStyle: 'width: 20%',
  },
  {
    name: 'reqAuthor',
    align: 'left',
    label: 'Ответственный',
    field: 'author',
    sortable: true,
    format: (val) => (val ? `${val}` : 'Не назначен'),
    headerStyle: 'width: 20%',
  },
  {
    name: 'reqOperator',
    align: 'left',
    label: 'Оператор',
    field: 'operator',
    sortable: true,
    format: (val) => (val ? `${val}` : 'Не назначен'),
    headerStyle: 'width: 20%',
  },
  {
    name: 'reqStatus',
    align: 'center',
    label: 'Статус заявки',
    field: 'status',
    sortable: true,
    format: (val) => (val ? `${val}` : 'Не указан'),
    headerStyle: 'width: 10%',
  },
  {
    name: 'reqRating',
    align: 'center',
    label: 'Оценка',
    field: '',
    sortable: true,
    format: (val) => {
      let rating = 'Без оценки';

      if (val === 0) rating = '0 / 5';
      else if (val === 1) rating = '1 / 5';
      else if (val === 2) rating = '2 / 5';
      else if (val === 3) rating = '3 / 5';
      else if (val === 4) rating = '4 / 5';
      else if (val === 5) rating = '5 / 5';

      return rating;
    },
    headerStyle: 'width: 10%',
  },
];

export default { reqsTableHead };
