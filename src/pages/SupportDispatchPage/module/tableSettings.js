import { date } from 'quasar';

const dispatchListTableHead = [
  {
    name: 'date',
    label: 'Дата',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 8%',
  },
  {
    name: 'account',
    label: 'Учетная запись',
    field: 'account',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 17%',
  },
  {
    name: 'company',
    label: 'Компания',
    field: 'company',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 17%',
  },
  {
    name: 'name',
    label: 'Наименование',
    field: (row) => {
      const client = row.company || row.account;
      return `${client} отчёт за период с ${date.formatDate(row.d_start, 'DD.MM.YYYY')} по 
      ${date.formatDate(row.d_end, 'DD.MM.YYYY')}`;
    },
    align: 'left',
    sortable: true,
    headerStyle: 'width: 40%',
  },
  {
    name: 'author',
    label: 'Ответственный',
    field: 'author',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 18%',
  },
];

const workTableHead = [
  {
    name: 'object',
    label: 'Объект',
    field: (row) => row.acc_obj || row.obj,
    align: 'left',
    sortable: true,
    headerStyle: 'width: 13%',
  },
  {
    name: 'millage',
    label: 'Пробег, км',
    field: 'millage_w',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 5%',
  },
  {
    name: 'result',
    label: 'Строка для сводки',
    field: 'result_row',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 14%',
  },
  {
    name: 'online',
    label: 'Онлайн',
    field: 'online_ux',
    format: (val) => `${date.formatDate(val, 'MM:HH:SS')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 6%',
  },
  {
    name: 'gps',
    label: 'GPS',
    field: 'coord_ux',
    format: (val) => `${date.formatDate(val, 'MM:HH:SS')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 6%',
  },
  {
    name: 'dataStatus',
    label: 'Данные',
    field: 'status_data',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'trackStatus',
    label: 'Трек',
    field: 'status_lumbago',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'flsStatus',
    label: 'Работа ДУТ',
    field: 'status_dut',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 11%',
  },
  {
    name: 'ignStatus',
    label: 'Работа зажигания',
    field: 'status_ign',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 11%',
  },
  {
    name: 'comment',
    label: 'Комментарии',
    field: 'comment',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 16%',
  },
];

const fdownTableHead = [
  {
    name: 'object',
    label: 'Объект',
    field: (row) => row.acc_obj || row.obj,
    align: 'left',
    sortable: true,
    headerStyle: 'width: 20%',
  },
  {
    name: 'date',
    label: 'Время',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY HH:MM')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'status',
    label: 'Статус',
    field: 'status',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'volume',
    label: 'Слито, л',
    field: 'fuel_down_w',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'startFuel',
    label: 'Нач. уровень, л',
    field: 'start_fuel',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'endFuel',
    label: 'Кон. уровень, л',
    field: 'end_fuel',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'comment',
    label: 'Комментарий',
    field: 'comment',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 30%',
  },
];

const refuelTableHead = [
  {
    name: 'object',
    label: 'Объект',
    field: (row) => row.acc_obj || row.obj,
    align: 'left',
    sortable: true,
    headerStyle: 'width: 18%',
  },
  {
    name: 'date',
    label: 'Время',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY HH:MM')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'type',
    label: 'Тип топлива',
    field: 'type',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'volumeCheck',
    label: 'По ведомости, л',
    field: 'fuel_up_check',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'volumeWialon',
    label: 'По Wialon, л',
    field: 'fuel_up_w',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'diffVol',
    label: 'Погрешность, л',
    field: 'diff_vol',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'diffPercent',
    label: 'Погрешность, %',
    field: 'diff_p',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 9%',
  },
  {
    name: 'comment',
    label: 'Комментарий',
    field: 'comment',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 28%',
  },
];

const speedTableHead = [
  {
    name: 'object',
    label: 'Объект',
    field: 'obj',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 15%',
  },
  {
    name: 'date',
    label: 'Время',
    field: 'date',
    format: (val) => `${date.formatDate(val, 'DD.MM.YYYY HH:MM')}`,
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'address',
    label: 'Положение',
    field: 'adress',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 20%',
  },
  {
    name: 'duration',
    label: 'Длительность, мин.',
    field: 'how_long',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'speed',
    label: 'Макс. скорость, км/ч',
    field: 'max_speed',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'limit',
    label: 'Ограничение, км/ч',
    field: 'limit_speed',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 10%',
  },
  {
    name: 'comment',
    label: 'Комментарий',
    field: 'comment',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 25%',
  },
];

const consumTableHead = [
  {
    name: 'object',
    label: 'Объект',
    field: (row) => row.acc_obj || row.obj,
    align: 'left',
    sortable: true,
    headerStyle: 'width: 24%',
  },
  {
    name: 'consumNorm',
    label: 'Расход по нормам, л',
    field: 'consum_n',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 12%',
  },
  {
    name: 'consumWialon',
    label: 'Расход по Wialon, л',
    field: 'consum_w',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 12%',
  },
  {
    name: 'difference',
    label: 'Пережог / Экономия, л',
    field: 'consum_dif',
    align: 'center',
    sortable: true,
    headerStyle: 'width: 14%',
  },
  {
    name: 'comment',
    label: 'Комментарий',
    field: 'comment',
    format: (val) => (val || '-----'),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 38%',
  },
];

const feedbackTableHead = [
  {
    name: 'recipient',
    label: 'Кому звонил',
    field: 'who_was_call',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 15%',
  },
  {
    name: 'link',
    label: 'Ссылка на звонок',
    field: 'call_link',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 30%',
  },
  {
    name: 'result',
    label: 'Результат звонка',
    field: 'comment',
    align: 'left',
    sortable: true,
    headerStyle: 'width: 55%',
  },
];

export default {
  dispatchListTableHead,
  workTableHead,
  fdownTableHead,
  refuelTableHead,
  speedTableHead,
  consumTableHead,
  feedbackTableHead,
};
