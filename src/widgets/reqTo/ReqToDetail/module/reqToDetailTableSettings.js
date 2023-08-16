const reqsTableHead = [
  {
    name: 'num',
    align: 'center',
    label: '#',
    field: 'index',
    headerStyle: 'width: 5%',
  },
  {
    name: 'car',
    align: 'left',
    label: 'Объект заявки',
    field: 'car',
    sortable: true,
    headerStyle: 'width: 30%',
  },
  {
    name: 'comment',
    align: 'left',
    label: 'Комментарий',
    field: 'comment',
    sortable: true,
    headerStyle: 'width: 65%',
    classes: 'table__col-wrap',
    format: (val) => (val ? `${val}` : 'Без комментария'),
  },
];

export default { reqsTableHead };
