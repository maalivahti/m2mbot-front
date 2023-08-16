import { date } from 'quasar';

const options = [
  {
    label: 'Заявки на ТО',
    value: 'reqs',
  },
  {
    label: 'Заказ-наряды',
    value: 'orders',
  },
];

const reqsTableHead = [
  {
    name: 'reqNum',
    required: true,
    label: '№ заявки',
    align: 'center',
    field: 'number',
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'reqDate',
    align: 'center',
    label: 'Дата заявки',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'reqPlannedDate',
    align: 'center',
    label: 'Планируемая дата',
    field: 'desterm',
    format: (val) => (val ? `${date.formatDate(val, 'DD.MM.YYYY')}` : 'Не указана'),
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'reqCompany',
    align: 'left',
    label: 'Компания',
    field: 'company',
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'reqObj',
    align: 'left',
    label: 'Объект заявки',
    field: 'obj_list',
    sortable: true,
    format: (val) => (val ? Object.values(val).map((car) => `${car[0]}; `) : 'Не указан'),
    headerStyle: 'width: 20%',
    classes: 'table__col-wrap',
  },
  {
    name: 'reqAddress',
    align: 'left',
    label: 'Место ремонта',
    field: 'address',
    sortable: true,
    format: (val) => (val ? `${val}` : 'Не указан'),
    headerStyle: 'width: 20%',
  },
  {
    name: 'reqStatus',
    align: 'center',
    label: 'Статус заявки',
    field: 'status',
    sortable: true,
    headerStyle: 'width: 8%',
  },
];

const orderTableHead = [
  {
    name: 'orderNum',
    required: true,
    label: '№ заявки',
    align: 'center',
    field: 'number',
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'orderDate',
    align: 'center',
    label: 'Дата заявки',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'orderPlannedDate',
    align: 'center',
    label: 'Планируемая дата',
    field: 'desterm',
    format: (val) => (val ? `${date.formatDate(val, 'DD.MM.YYYY')}` : 'Не указана'),
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'orderCompany',
    align: 'left',
    label: 'Компания',
    field: 'company',
    sortable: true,
    headerStyle: 'width: 20%',
  },
  {
    name: 'orderObject',
    align: 'left',
    label: 'Объект заявки',
    field: 'obj_list',
    sortable: true,
    format: (val) => (val ? `${val.join('; ')}` : 'Не указан'),
    headerStyle: 'width: 20%',
    classes: 'table__col-wrap',
  },
  {
    name: 'orderAddress',
    align: 'left',
    label: 'Место ремонта',
    field: 'address',
    sortable: true,
    format: (val) => (val ? `${val}` : 'Не указан'),
    headerStyle: 'width: 20%',
  },
  {
    name: 'orderStatus',
    align: 'center',
    label: 'Статус заказ-наряда',
    field: 'status',
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'orderRating',
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
    headerStyle: 'width: 8%',
  },
];

export default { options, reqsTableHead, orderTableHead };
