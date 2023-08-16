const typeEventList = [
  { label: 'Проверка заправки', value: 'check_trans' },
  { label: 'Заправки с погрешностью', value: 'check_bad_trans' },
  { label: 'Подтверждение слива', value: 'conf_fd' },
  { label: 'Заявки на ТО', value: 'task_to' },
  { label: 'Заявки на ТП', value: 'task_tp' },
];

const typeSending = [
  { label: 'Telegram', value: 'telegram' },
  { label: 'На почту', value: 'email' },
];

const typeObject = [
  { label: 'По компании', value: 'company' },
  { label: 'По объекту', value: 'object' },
];

export default {
  typeEventList,
  typeSending,
  typeObject,
};
