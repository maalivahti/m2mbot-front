import { date } from 'quasar';

const fuelDownTableHead = [
  {
    name: 'object',
    label: 'Имя объекта',
    field: 'object',
    align: 'left',
    sortable: true,
    style: 'width: 24%',
  },
  {
    name: 'date',
    label: 'Дата слива',
    field: 'time_fd',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY HH:MM')}`,
    align: 'center',
    sortable: true,
    style: 'width: 10%',
  },
  {
    name: 'fuelVolStart',
    label: 'Нач. уровень топлива',
    field: 'fuel_start',
    format: (val) => `${val} л.`,
    align: 'center',
    sortable: true,
    style: 'width: 10%',
  },
  {
    name: 'fuelVolEnd',
    label: 'Кон. уровень топлива',
    field: 'fuel_end',
    format: (val) => `${val} л.`,
    align: 'center',
    sortable: true,
    style: 'width: 10%',
  },
  {
    name: 'fDownVol',
    label: 'Слито',
    field: 'volume',
    format: (val) => `${val} л.`,
    align: 'center',
    sortable: true,
    style: 'width: 10%',
  },
  {
    name: 'status',
    label: 'Статус слива',
    field: 'status',
    align: 'center',
    sortable: true,
    style: 'width: 16%',
  },
  {
    name: 'company',
    label: 'Компания',
    field: 'company',
    align: 'center',
    sortable: true,
    style: 'width: 20%',
  },
];

export default { fuelDownTableHead };
